import { Browser, Page, PageEventObject } from "puppeteer-core";
import { ScriptConstructor, RunnableScript, InjectableScript, InjectPool } from "@pioneerjs/common";


import { ScriptContext } from "../script/script.context";
import { ScriptEventPool } from "../script/script.event.pool";
import { ScriptFactory } from "../script/script.factory";
import { Store } from "../script/script.store";



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
                console.log(`[pioneer]:script running - ${script.name}`);
            }
            for (const script of injectableScripts) {
                console.log(`[pioneer]:script injected - ${script.name}`);
            }
        })
    }

    /**
     * init runnable script, create script context and save script instance in ScriptFactory
     * @param pages  init pages {@link initPages()}
     */
    private initRunnableScript(pages: Page[]): RunnableScript[] {
        const scripts: RunnableScript[] = []
        for (const constructor of this.options.scripts) {
            const page = pages.shift()
            if (page) {
                // create context
                const context = new ScriptContext(new Store(), new ScriptEventPool(page, this.options.events))
                // instance
                const name = Reflect.getMetadata("name", constructor)
                const script = ScriptFactory.createScript(constructor, { name, page, browser: this.browser, context })
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
        // inject script
        for (const inject of InjectPool.getInjectPool()) {

            const target = ScriptFactory.getScript(inject.target.constructor)

            if (target) {
                const { page, browser, context } = target
                if (inject.scriptConstructor) {
                    // get script name
                    const name = Reflect.getMetadata("name", inject.scriptConstructor)
                    // create script
                    const script = ScriptFactory.createScript(inject.scriptConstructor, { name, page, browser, context })
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
        const pages: Page[] = []
        for (let i = 0; i < this.options.scripts.length; i++) {
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





