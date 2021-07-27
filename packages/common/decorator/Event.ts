

import { PageEventObject } from 'puppeteer-core';
import 'reflect-metadata';


export const EVENT_NAME_SYMBOL = Symbol("event.name")
export const EVENT_OPTIONS_SYMBOL = Symbol("event.options")

export interface EventOptions {
    name: keyof PageEventObject,
    waitForLoad?: boolean
}

export function Event(options: EventOptions): MethodDecorator {
    return (target: Object, propertyKey: string | symbol) => {
        Reflect.defineMetadata(EVENT_NAME_SYMBOL, options.name, target, propertyKey)
        Reflect.defineMetadata(EVENT_OPTIONS_SYMBOL, options, target, propertyKey)
    }
}