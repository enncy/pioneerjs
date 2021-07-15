/* eslint-disable @typescript-eslint/ban-types */

import 'reflect-metadata';

const injectableScriptConstructors: Function[] = []

/**
 * Injectable decorator, use in  InjectableScript
 * @see InjectableScript
 */
export function Injectable(): Function {
    return function (constructor: Function): void {
        Reflect.defineMetadata("name", constructor.name, constructor)
        injectableScriptConstructors.push(constructor)
    }
}

export class InjectableScriptLoader {
    static getScriptConstructors(): Function[] {
        return injectableScriptConstructors
    }
    static getScriptConstructor(constructor: Function): Function | undefined {
        return injectableScriptConstructors.find(i => i.name === constructor.name)
    }
}