import { Page, Browser } from "puppeteer-core";
import { ScriptContext } from "../script/script.context";
 
<<<<<<< HEAD:packages/core/scripts/index.ts
=======

>>>>>>> 928488426ae28020d0631bc5a52a712dd15b5635:packages/core/scripts/script.ts
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

export interface ScriptConstructor<T extends Script> {
    new(options: ScriptOptions): T
}
