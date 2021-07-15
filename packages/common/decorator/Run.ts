import { PageEventObject } from 'puppeteer-core';
import 'reflect-metadata';

export const RUN_EVENT_SYMBOL = Symbol("run.event")
export const RUN_ONCE_EVENT_SYMBOL = Symbol("run.once.event")

export function Run(event: keyof PageEventObject): MethodDecorator {
    return RunDecorator(event, RUN_EVENT_SYMBOL)
} 

export function RunOnce(event: keyof PageEventObject): MethodDecorator {
    return RunDecorator(event, RUN_ONCE_EVENT_SYMBOL)
}

function RunDecorator(event: keyof PageEventObject, metadateSymbol: string | symbol) {
    return function <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): void | TypedPropertyDescriptor<T> {
        Reflect.defineMetadata(metadateSymbol, event, target, propertyKey)
    }
}
