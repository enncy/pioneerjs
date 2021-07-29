

import { PageEventObject } from 'puppeteer-core';
import 'reflect-metadata';


export const EVENT_NAME_SYMBOL = Symbol("event.name")
export const EVENT_METHOD_KEYS_SYMBOL = Symbol("event.method.keys")
export const EVENT_OPTIONS_SYMBOL = Symbol("event.options")

export interface EventOptions {
    name: keyof PageEventObject,
}

/**
 * use  `@Event` decorator to listening page event in  `Script` method
 * @param name  keyof PageEventObject
 */
export function Event(name: keyof PageEventObject): MethodDecorator

/**
 * use  `@Event` decorator to listening page event in  `Script` method
 * @param options  {@link EventOptions}
 */
export function Event(options: EventOptions): MethodDecorator

 
export function Event(options: EventOptions | keyof PageEventObject): MethodDecorator {
    return (target: Object, propertyKey: string | symbol) => {
        const keys: any[] = Reflect.getMetadata(EVENT_METHOD_KEYS_SYMBOL, target) || []
        keys.push(propertyKey)

        if (typeof (options) === "string") Reflect.defineMetadata(EVENT_NAME_SYMBOL, options, target, propertyKey)
        Reflect.defineMetadata(EVENT_METHOD_KEYS_SYMBOL, keys, target)
        Reflect.defineMetadata(EVENT_OPTIONS_SYMBOL, options, target, propertyKey)

    }
}