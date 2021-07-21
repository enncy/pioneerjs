/* eslint-disable @typescript-eslint/ban-types */
import 'reflect-metadata';


export const INJECTABLE_NAME_SYMBOL = Symbol("injectable.name")

/**
 * Injectable decorator, use in  InjectableScript
 * @see InjectableScript
 */
export function Injectable(): ClassDecorator {
    return function (constructor: Function): void {
        Reflect.defineMetadata(INJECTABLE_NAME_SYMBOL, constructor.name, constructor)
    }
}
