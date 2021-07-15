import 'reflect-metadata';
/**
 * Injectable decorator, use in  InjectableScript
 * @see InjectableScript
 */
export declare function Injectable(): ClassDecorator;
export declare class InjectableScriptLoader {
    static getScriptConstructors<T extends Function>(): T[];
    static getScriptConstructor<T extends Function>(constructor: T): T | undefined;
}
