import { Browser, Page, PageEventObject } from "puppeteer-core";
import { INJECT_KEYS_SYMBOL, RUNNABLE_NAME_SYMBOL } from "@pioneerjs/common";


import { ScriptContext } from "../script/script.context";
import { ScriptEventPool } from "../script/script.event.pool";
import { ScriptFactory } from "../script/script.factory";
import { Store } from "../script/script.store";

import { ScriptConstructor } from "../scripts/script";
import { RunnableScript } from "../scripts/runnable.script";
import { InjectableScript } from "../scripts/injectable.script";
import 'reflect-metadata';
import { InjectFactory } from "./inject.factory";

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
            const injectableScripts = this.initInjectableScript(runnableScripts)
            // start script
            for (const script of runnableScripts) {
                script.startup()
                console.log(`[pioneerjs]:script running - ${script.name}`);
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
                const script = ScriptFactory.createScript<RunnableScript>(constructor, { name: constructor.name, page, browser: this.browser, context })
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
                    const injectScript = InjectFactory.create(runableScript, key)
                    scripts.push(injectScript)
                    Reflect.set(runableScript, key, injectScript)
                    console.log(`[pioneerjs]:script injected - ${runableScript.name}.${injectScript.name}`);
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





