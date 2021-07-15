/* eslint-disable @typescript-eslint/ban-types */


const runnableScriptConstructors: any[] = []

export const RUNNABLE_URL_SYMBOL = Symbol("runnable.url")
export const RUNNABLE_NAME_SYMBOL = Symbol("runnable.name")

/**
 * Runnable decorator, use in  RunnableScript
 * @see RunnableScript
 */
export function Runnable(url = ""): ClassDecorator {

    return function (constructor: Function): void {
        constructor.prototype.url = url
        Reflect.defineMetadata(RUNNABLE_URL_SYMBOL, url, constructor)
        Reflect.defineMetadata(RUNNABLE_NAME_SYMBOL, constructor.name, constructor)
        runnableScriptConstructors.push(constructor)
    }
}


export class RunnableScriptLoader {
    static getScriptConstructors(): any[] {
        return runnableScriptConstructors
    }
    static getScriptConstructor(constructor: any): any | undefined {
        return runnableScriptConstructors.find(i => i.name === constructor.name)
    }
}