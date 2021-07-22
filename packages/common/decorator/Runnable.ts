/* eslint-disable @typescript-eslint/ban-types */


const runnableScriptConstructors: any[] = []

export const RUNNABLE_URL_SYMBOL = Symbol("runnable.url")
export const RUNNABLE_OPTIONS_SYMBOL = Symbol("runnable.options")
export interface RunnableOptions {
    url?: string
}

/**
 * Runnable decorator, use in  RunnableScript
 * @see RunnableScript
 */
export function Runnable(options?: RunnableOptions): ClassDecorator {

    return function (constructor: Function): void {
        if (options?.url) {
            constructor.prototype.url = options.url
            Reflect.defineMetadata(RUNNABLE_URL_SYMBOL, options.url, constructor)
        }

        Reflect.defineMetadata(RUNNABLE_OPTIONS_SYMBOL, options, constructor)
        runnableScriptConstructors.push(constructor)
    }
}
