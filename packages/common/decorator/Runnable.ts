/* eslint-disable @typescript-eslint/ban-types */


const runnableScriptConstructors: any[] = []

export const RUNNABLE_URL_SYMBOL = Symbol("runnable.url")
export const RUNNABLE_NAME_SYMBOL = Symbol("runnable.name")
export const RUNNABLE_OPTIONS_SYMBOL = Symbol("runnable.options")
export interface RunnableOptions {
    url?: string
    name?: string
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
        if (options?.name) {
            constructor.prototype.name = options.name
            Reflect.defineMetadata(RUNNABLE_NAME_SYMBOL, options.name, constructor)
        }

        Reflect.defineMetadata(RUNNABLE_OPTIONS_SYMBOL, options, constructor)
        runnableScriptConstructors.push(constructor)
    }
}
