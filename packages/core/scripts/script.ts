import { Page, Browser } from "puppeteer-core";
import { ScriptContext } from "../script/script.context";
 

export interface Script {
    name:string,  
    page: Page
    browser: Browser
    context: ScriptContext
}


export interface ScriptOptions {
    name:string, 
    page: Page,
    browser: Browser,
    context: ScriptContext
}

export interface ScriptConstructor<T extends Script>{
    new(options: ScriptOptions): T
}
