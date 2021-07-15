/* eslint-disable @typescript-eslint/ban-types */


const runnableScripts: Function[] = []

/**
 * Runnable decorator, use in  RunnableScript
 * @see RunnableScript
 */
export function Runnable(url = ""): Function {

    return function (constructor: Function): void {
        constructor.prototype.url = url
        Reflect.defineMetadata("name", constructor.name, constructor)
        runnableScripts.push(constructor)
    }
}
