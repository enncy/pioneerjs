import EventEmitter from "events";
import { Page, Browser } from "puppeteer-core";
import { ScriptContext } from "../context/script.context";
 
export interface Script  {
    name:string,  
    page: Page
    browser: Browser
    context: ScriptContext
    [x: string]: any
}


export interface ScriptOptions {
    name:string, 
    page: Page,
    browser: Browser,
    context: ScriptContext
}

export interface ScriptConstructor<T extends Script> {
    new(options: ScriptOptions): T
}


