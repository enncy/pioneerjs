import { Browser, Page, PageEventObject } from "puppeteer-core";
import { ScriptContext } from "../script/ScriptContext";

import { ScriptStorage } from "../script/ScriptStorage";
import { ScriptEventPool } from "../script/ScriptEventPool";

import { ScriptFactory } from "../script/ScriptFactory";
import { ScriptConstructor } from "../script/Script";
import { RunnableScript } from "../script/RunnableScript";
import { InjectPool } from "../../decorator/Inject";




/**
 * the appliaction starter
 */
export class Pioneer {

    private browser: Browser
    private options: PioneerOptioins
    
    constructor(browser: Browser, options: PioneerOptioins) {
        this.browser = browser
        this.options = options
        this.initPages((pages) => {
            const runnableScripts = this.initRunnableScript(pages)
            this.initInjectableScript(runnableScripts)
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
                const context = new ScriptContext(new ScriptStorage(), new ScriptEventPool(page, this.options.events))
                // instance
                const name = Reflect.getMetadata("name", constructor)
                const script = ScriptFactory.createScript(constructor, { name, page, browser: this.browser, context })
                // startup
                script.startup()
                scripts.push(script)
            }
        }
        return scripts
    }

    /**
     * init injectable script
     * @see initScript()
     */
    private initInjectableScript(runnableScripts: RunnableScript[]) {
        // inject script
        for (const inject of InjectPool.getInjectPool()) {
            const target = ScriptFactory.getScript(inject.targetConstructor.name)
            if (target) {
                const { page, browser, context } = target
                if (inject.scriptConstructor) {
                    const name = Reflect.getMetadata("name", inject.targetConstructor)
                    const script = new inject.scriptConstructor({ name, page, browser, context })
                    Reflect.set(target, inject.propertyKey, script)
                }
            }
        }

    }


    /** create pages  */
    private async initPages(callback: (pages: Page[]) => void): Promise<Page[]> {
        let pages: Page[] = []
        for (let i = 0; i < this.options.scripts.length; i++) {
            pages.push(await this.browser.newPage())
        }
        callback(pages)
        return pages
    }

    /** static instance function */
    static create(browser: Browser, options: PioneerOptioins) {
        return new Pioneer(browser, options)
    }

}

export interface PioneerOptioins {
    scripts: ScriptConstructor<RunnableScript>[]
    /** some events `keyof PageEventObject`  you want to catch in chrome page*/
    events?: [keyof PageEventObject],
}





