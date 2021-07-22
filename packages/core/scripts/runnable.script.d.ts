import { Page, Browser } from "puppeteer-core";
import { ScriptContext } from "../script/script.context";
import { Script, ScriptOptions } from "./script";
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
export declare abstract class RunnableScript implements Script {
    url?: string;
    name: string;
    page: Page;
    browser: Browser;
    context: ScriptContext;
    constructor({ page, browser, context, name }: ScriptOptions);
    /** called when browser page created*/
    startup(): void;
    /** called when the {@link run()} function is called*/
    created(): Promise<void>;
    /** called when the window load  */
    abstract run(): Promise<void>;
    /** called when browser page destroyed*/
    update(): Promise<void>;
    /** called when browser page destroyed*/
    destroyed(): Promise<void>;
}
