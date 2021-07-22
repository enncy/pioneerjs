/* eslint-disable @typescript-eslint/ban-types */


const runnableScriptConstructors: any[] = []

export const RUNNABLE_URL_SYMBOL = Symbol("runnable.url")
export const RUNNABLE_NAME_SYMBOL = Symbol("runnable.name")
export interface RunnableOptions {
    url: string

}

/**
 * Runnable decorator, use in  RunnableScript
 * @see RunnableScript
 */
export function Runnable(options: RunnableOptions | undefined): ClassDecorator {

    return function (constructor: Function): void {
        if (options?.url) {
            constructor.prototype.url = options.url
            Reflect.defineMetadata(RUNNABLE_URL_SYMBOL, options.url, constructor)
        }

        Reflect.defineMetadata(RUNNABLE_NAME_SYMBOL, constructor.name, constructor)
        runnableScriptConstructors.push(constructor)
    }
}
 