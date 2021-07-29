import { Browser, Page, PageEventObject } from "puppeteer-core";
import { INJECT_KEYS_SYMBOL } from "@pioneerjs/common";


import { ScriptContext } from "../context/script.context";
import { ScriptEventPool } from "../context/script.event.pool";
import { ScriptFactory } from "./script.factory";
import { Store } from "../context/script.store";

import { ScriptConstructor } from "../scripts/script";
import { RunnableScript } from "../scripts/runnable.script";
import { InjectableScript } from "../scripts/injectable.script";
import 'reflect-metadata';
import { DecoratorHandler } from "./decorator.handler";
import { PioneerProxy, MethodProxy } from "./proxy";

 

export interface StartupOptions {
    /**
     * target method proxy 
     * 
     * ```
     * // example
     * const pioneer = Pioneer.create(...)
     * pioneer.startup({
     *     methodProxy:{
     *         page:{
     *              keys:['goto'],
     *              handler(target:any,key:any){
     *                 console.log(`target method-${key}() is called`)
     *                 // target method-goto() is called
     *                 return Reflect.get(target, key, receiver);
     *              }
     *         }
     *     }
     *  
     * })
     * ```
     * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
     */
    methodProxy?: MethodProxy
}


/**
 *  appliaction starter
 * 
 */
export class Pioneer {

    private browser: Browser
    private options?: PioneerOptioins

    public runnableScripts?: RunnableScript[];
    public injectableScripts?: InjectableScript[];

    constructor(browser: Browser) {
        this.browser = browser
    }

    private async init(methodProxy?: MethodProxy): Promise<void> {

        // create pages 
        let pages = await this.initPages()
        // page proxy
        pages = pages.map(p => PioneerProxy.methodProxy(p, methodProxy?.page))
        // init runnable script
        this.runnableScripts = this.initRunnableScript(pages)
        this.injectableScripts = this.initInjectableScript(this.runnableScripts)


        // script proxy
        this.runnableScripts = this.runnableScripts.map(s => PioneerProxy.methodProxy(s, methodProxy?.runnableScript))
        // run event decorator
        DecoratorHandler.handleEventDecorators([...this.runnableScripts, ...this.injectableScripts])

    }

    /**
     *  run script
     * @param options 
     */
    public async startup({ scripts, events, log, methodProxy }: PioneerOptioins & StartupOptions): Promise<void> {
        this.options = { scripts, events, log }

        await this.init(methodProxy)

        if (this.runnableScripts) {
            // start script
            for (const script of this.runnableScripts) {
                script.startup()
                if (this.options.log) console.log(`[pioneerjs]:script running - ${script.name}`);
            }
        }

    }

    /**
     * init runnable script, create script context and save script instance in ScriptFactory
     * @param pages  init pages {@link initPages()}
     */
    private initRunnableScript(pages: Page[]): RunnableScript[] {
        const scripts: RunnableScript[] = []
        const constructors = this.options?.scripts
        if (constructors === undefined) {
            throw new Error("There is no runnable script in pioneer startup()")
        }

        for (const constructor of constructors) {

            const page = pages.shift()
            if (page) {
                // create context
                const context = new ScriptContext(new Store(), new ScriptEventPool(page, this.options?.events))
                // instance
                const script = ScriptFactory.createRunnableScript(constructor, { name: constructor.name, page, browser: this.browser, context })
                // startup
                scripts.push(script)
            }
        }
        return scripts
    }

    /**
     * init injectable script
     * @see initScript()
     */
    private initInjectableScript(runnableScripts: RunnableScript[]): InjectableScript[] {
        const scripts: InjectableScript[] = []

        for (const runableScript of runnableScripts) {
            const keys = Reflect.getMetadata(INJECT_KEYS_SYMBOL, runableScript)
            if (keys) {
                for (const key of keys) {
                    const injectScript = ScriptFactory.createInjectableScript(runableScript, key)
                    scripts.push(injectScript)
                    Reflect.set(runableScript, key, injectScript)
                    if (this.options?.log) console.log(`[pioneerjs]:script injected - ${runableScript.name}.${injectScript.name}`);
                }
            }
        }
        return scripts
    }

    /** create pages  */
    private async initPages(callback?: (pages: Page[]) => void): Promise<Page[]> {
        const pages: Page[] = await this.browser.pages()
        let constructors = this.options?.scripts
        if (constructors === undefined) {
            throw new Error("There is no runnable script in pioneer startup()")
        }
        // remove RunnableScript
        constructors = constructors.filter(i => i.name !== RunnableScript.name)
        // start in one, because browser launch start with one bage
        for (let i = 1; i < constructors.length; i++) {
            pages.push(await this.browser.newPage())
        }
        callback?.(pages)
        return pages
    }

    /** static instance function */
    static create(browser: Browser): Pioneer {
        return new Pioneer(browser)
    }

}

export interface PioneerOptioins {
    scripts: ScriptConstructor<RunnableScript>[]
    /** some events `keyof PageEventObject`  you want to catch in chrome page*/
    events?: [keyof PageEventObject],
    /** is open the running log */
    log?: boolean,
}





