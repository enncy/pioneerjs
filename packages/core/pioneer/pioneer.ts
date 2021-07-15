import { Browser, Page, PageEventObject } from "puppeteer-core";
import { InjectPool, RunnableScriptLoader, RUNNABLE_NAME_SYMBOL } from "@pioneerjs/common";


import { ScriptContext } from "../script/script.context";
import { ScriptEventPool } from "../script/script.event.pool";
import { ScriptFactory } from "../script/script.factory";
import { Store } from "../script/script.store";

import { ScriptConstructor } from "../scripts/script";
import { RunnableScript } from "../scripts/runnable.script";
import { InjectableScript } from "../scripts/injectable.script";
import { WaitForScript } from "../scripts/waitfor.script";



/**
 * the appliaction starter
 * 
 */
export class Pioneer {

    private browser: Browser
    private options: PioneerOptioins


    constructor(browser: Browser, options: PioneerOptioins) {

        this.browser = browser
        this.options = options

        // create pages 
        this.initPages((pages) => {
            // init runnable script
            const runnableScripts = this.initRunnableScript(pages)

            // init injectable script
            const injectableScripts = this.initInjectableScript()
            // start script
            for (const script of runnableScripts) {
                script.startup()
                console.log(`[pioneerjs]:script running - ${script.name}`);
            }
            for (const script of injectableScripts) {
                console.log(`[pioneerjs]:script injected - ${script.name}`);
            }
        })
    }

    /**
     * init runnable script, create script context and save script instance in ScriptFactory
     * @param pages  init pages {@link initPages()}
     */
    private initRunnableScript(pages: Page[]): RunnableScript[] {
        const scripts: RunnableScript[] = []
        const constructors = this.options.scripts

        for (const constructor of constructors) {

            const page = pages.shift()
            if (page) {
                // create context
                const context = new ScriptContext(new Store(), new ScriptEventPool(page, this.options.events))
                // instance
                const name = Reflect.getMetadata(RUNNABLE_NAME_SYMBOL, constructor)
                const script = ScriptFactory.createScript<RunnableScript>(constructor, { name, page, browser: this.browser, context })
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
    private initInjectableScript(): InjectableScript[] {
        const scripts: InjectableScript[] = []
        const injectPool = InjectPool.getInjectPool()

        // inject script
        for (const inject of injectPool) {

            const target = ScriptFactory.getScript(inject.target.constructor)

            if (target) {

                if (inject.scriptConstructor) {
                    // get script name
                    const name = Reflect.getMetadata("name", inject.scriptConstructor)
                    // create script
                    const script = new inject.scriptConstructor(target)
                    // inject
                    Reflect.set(target, inject.propertyKey, script)
                    scripts.push(script)
                }
            }
        }
        return scripts
    }

    /** create pages  */
    private async initPages(callback: (pages: Page[]) => void): Promise<Page[]> {
        const pages: Page[] = await this.browser.pages()
        let constructors = this.options.scripts
        // remove RunnableScript
        constructors = constructors.filter(i => i.name !== RunnableScript.name)
        // start in one, because browser launch start with one bage
        for (let i = 1; i < constructors.length; i++) {
            pages.push(await this.browser.newPage())
        }
        callback(pages)
        return pages
    }

    /** static instance function */
    static create(browser: Browser, options: PioneerOptioins): Pioneer {
        return new Pioneer(browser, options)
    }

}

export interface PioneerOptioins {
    scripts: ScriptConstructor<RunnableScript>[]
    /** some events `keyof PageEventObject`  you want to catch in chrome page*/
    events?: [keyof PageEventObject],
    /** is open the running log */
    log?: boolean,
}





