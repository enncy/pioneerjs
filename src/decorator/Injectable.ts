import { InjectableScript } from "../core/script/InjectableScript"
import { ScriptConstructor } from "../core/script/Script"
import 'reflect-metadata';

const injectableScriptConstructors: ScriptConstructor<InjectableScript>[] = []


export function Injectable(name?: string) {
    return function (constructor: ScriptConstructor<InjectableScript>) {
        Reflect.defineMetadata("name", name || constructor.name, constructor)
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