/* eslint-disable @typescript-eslint/no-empty-function */

import { Page, Browser } from "puppeteer-core";

import { ScriptContext } from "../script/script.context";
import { Script, ScriptOptions } from "./script";

import { WaitForScript } from "./waitfor.script";

/**
 * runnable script , use @Runnable to decorator   
 * example : 
 * ```
 * @Runnable('https://google.com')
 * class TestScript extends RunnableScript{
 * 
 *      async run():Promise<void>{
 *          console.log(this.page.url()) //https://google.com
 *      }
 * 
 * }
 * ```
 */

export abstract class RunnableScript implements Script {
    url?: string
    name: string;
    page: Page;
    browser: Browser;
    context: ScriptContext;

    constructor({ page, browser, context, name }: ScriptOptions) {
        this.name = name
        this.page = page
        this.browser = browser
        this.context = context
    }


    /** called when browser page created*/
    startup(): void {
        (async () => {
            const waitFor = new WaitForScript(this)

            var lisenningLoad = async () => {
                await waitFor.documentReady()
                this.run()
                // listening document update
                this.page.on('load', async () => {
                    await waitFor.documentReady()
                    this.update()
                })
            }

            // listening destroyed
            this.page.once('close', () => this.destroyed())

            if (this.url && this.url !== '') {
                // listening first load
                this.page.once('load', lisenningLoad)
                // goto the @Runnable's url value
                await this.page.goto(this.url)
            } else {
                lisenningLoad()
            }

        })()

    }

    /** called when the window load  */
    abstract run(): Promise<void>
    /** called when browser page destroyed*/
    async update(): Promise<void> { }
    /** called when browser page destroyed*/
    async destroyed(): Promise<void> { }
}
