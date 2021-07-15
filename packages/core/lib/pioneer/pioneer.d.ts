import { Browser, PageEventObject } from "puppeteer-core";
import { ScriptConstructor } from "../scripts/script";
import { RunnableScript } from "../scripts/runnable.script";
/**
 * the appliaction starter
 *
 */
export declare class Pioneer {
    private browser;
    private options;
    constructor(browser: Browser, options: PioneerOptioins);
    /**
     * init runnable script, create script context and save script instance in ScriptFactory
     * @param pages  init pages {@link initPages()}
     */
    private initRunnableScript;
    /**
     * init injectable script
     * @see initScript()
     */
    private initInjectableScript;
    /** create pages  */
    private initPages;
    /** static instance function */
    static create(browser: Browser, options: PioneerOptioins): Pioneer;
}
export interface PioneerOptioins {
    scripts: ScriptConstructor<RunnableScript>[];
    /** some events `keyof PageEventObject`  you want to catch in chrome page*/
    events?: [keyof PageEventObject];
    /** is open the running log */
    log?: boolean;
}
