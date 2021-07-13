import { InjectableScript } from "../../core/scripts/injectable.script";
import { ScriptConstructor } from "../../core/scripts/script";
import 'reflect-metadata';
/**
 * Injectable decorator, use in  InjectableScript
 * @see InjectableScript
 */
export declare function Injectable(): Function;
export declare class InjectableScriptLoader {
    static getScriptConstructors(): ScriptConstructor<InjectableScript>[];
    static getScriptConstructor(constructor: ScriptConstructor<InjectableScript>): ScriptConstructor<InjectableScript> | undefined;
}
