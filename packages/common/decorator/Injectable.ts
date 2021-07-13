/* eslint-disable @typescript-eslint/ban-types */
import { InjectableScript } from "../scripts/InjectableScript"
import { ScriptConstructor } from "../scripts/Script"
import 'reflect-metadata';

const injectableScriptConstructors: ScriptConstructor<InjectableScript>[] = []

/**
 * Injectable decorator, use in  InjectableScript
 * @see InjectableScript
 */
export function Injectable():Function {
    return function (constructor: ScriptConstructor<InjectableScript>): void {
        Reflect.defineMetadata("name", constructor.name, constructor)
        injectableScriptConstructors.push(constructor)
    }
}

export class InjectableScriptLoader {
    static getScriptConstructors(): ScriptConstructor<InjectableScript>[] {
        return injectableScriptConstructors
    }
    static getScriptConstructor(constructor: ScriptConstructor<InjectableScript>): ScriptConstructor<InjectableScript> | undefined {
        return injectableScriptConstructors.find(i => i.name === constructor.name)
    }
}