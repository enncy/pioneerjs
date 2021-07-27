import { Browser, Page } from "puppeteer-core";


import { ScriptContext } from "../context/script.context";
import { Script, ScriptOptions } from "./script";
import 'reflect-metadata';
import { EventOptions, EVENT_NAME_SYMBOL, EVENT_OPTIONS_SYMBOL } from "@pioneerjs/common";
import { WaitForScript } from "./waitfor.script";



/**
 *  injectable script, use in runnable script like tool or utils     
 * example :  
 * ```
 * // in this case , TestScript is RunnableScript, and WaitForScript is InjectableScript
 * @Runnable('https://www.google.com/')
 * export class TestScript extends RunnableScript {    
 *     @Inject
 *     private waitFor?: WaitForScript  // auto inject InjectableScript
 *
 *     async run(): Promise<void> {
 *         console.log("waidForSleep");
 *         this.waitFor?.sleep(3000)  // sleep 3000
 *         console.log(this.waitFor?.page.url()); ///https://www.google.com/
 *         console.log(this.waitFor?.page  === this.page); // true
 *     }
 * }
 * ```
 */
export class InjectableScript implements Script {
    name: string;
    page: Page;
    browser: Browser;
    context: ScriptContext;
    [x: string]: any

    constructor({ page, browser, context, name }: Script | ScriptOptions) {
        this.name = name
        this.page = page
        this.browser = browser
        this.context = context

        const waitFor = new WaitForScript({ page, browser, context, name })

        Reflect.ownKeys(this).forEach(key => {
            const eventName = Reflect.getMetadata(EVENT_NAME_SYMBOL, this, key)
            const eventOptions: EventOptions = Reflect.getMetadata(EVENT_OPTIONS_SYMBOL, this, key)
            if (eventName) {
                this.context.eventPool.on(eventName, async (event) => {
                    if (eventOptions.waitForLoad) {
                        await waitFor.documentReady()
                    }
                    this[(key as string)](event)
                })
            }
        })

    }



}

