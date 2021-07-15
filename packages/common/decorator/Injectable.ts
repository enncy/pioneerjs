/* eslint-disable @typescript-eslint/ban-types */
import 'reflect-metadata';

const injectableScriptConstructors: any[] = []

/**
 * Injectable decorator, use in  InjectableScript
 * @see InjectableScript
 */
export function Injectable(): ClassDecorator {
    return function (constructor: Function): void {
        Reflect.defineMetadata("name", constructor.name, constructor)
        injectableScriptConstructors.push(constructor)
    }
}

export class InjectableScriptLoader {
    static getScriptConstructors<T extends Function>(): T[] {
        return injectableScriptConstructors
    }
    static getScriptConstructor<T extends Function>(constructor: T): T | undefined {
        return injectableScriptConstructors.find(i => i.name === constructor.name)
    }
}