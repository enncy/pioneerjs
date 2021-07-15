import 'reflect-metadata';
/**
 * Injectable decorator, use in  InjectableScript
 * @see InjectableScript
 */
export declare function Injectable(): ClassDecorator;
export declare class InjectableScriptLoader {
    static getScriptConstructors(): any[];
    static getScriptConstructor(constructor: any): any | undefined;
}
