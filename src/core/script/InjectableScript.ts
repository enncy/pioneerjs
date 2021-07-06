import { Browser, Page } from "puppeteer-core";
import { Script, ScriptOptions } from "./Script";
import { ScriptContext } from "./ScriptContext";

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

    constructor({ page, browser, context, name }: ScriptOptions) {
        this.name = name
        this.page = page
        this.browser = browser
        this.context = context
    }



}

