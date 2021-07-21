/* eslint-disable @typescript-eslint/no-empty-function */

import { Page, Browser, HTTPRequest } from "puppeteer-core";

import { ScriptContext } from "../script/script.context";
import { ScriptFactory } from "../script/script.factory";
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


            // update function
            var lisenningUpdate = (req: HTTPRequest) => {
                if (req.resourceType() === 'document') {
                    const waitFor = new WaitForScript(this)
                    waitFor.nextTick('request', async () => {
                        await waitFor.documentReady()
                        this.update()
                    })
                }
            }

            // listening destroyed
            this.page.once('close', () => this.destroyed())

            if (this.url && this.url !== '') {
                // listening load
                this.page.once('load', () => {
                    this.run()
                    // listening document update
                    this.page.on('request', lisenningUpdate)
                })
                // goto the @Runnable's url value
                await this.page.goto(this.url)

            } else {
                this.run()
                // listening document update
                this.page.on('request', lisenningUpdate)
            }
            //callback
            this.created()


        })()

    }

    /** called when the {@link run()} function is called*/
    async created(): Promise<void> { }
    /** called when the window load  */
    abstract run(): Promise<void>
    /** called when browser page destroyed*/
    async update(): Promise<void> { }
    /** called when browser page destroyed*/
    async destroyed(): Promise<void> { }
}
