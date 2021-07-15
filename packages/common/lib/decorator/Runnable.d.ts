export declare const RUNNABLE_URL_SYMBOL: unique symbol;
export declare const RUNNABLE_NAME_SYMBOL: unique symbol;
/**
 * Runnable decorator, use in  RunnableScript
 * @see RunnableScript
 */
export declare function Runnable(url?: string): ClassDecorator;
export declare class RunnableScriptLoader {
    static getScriptConstructors(): any[];
    static getScriptConstructor(constructor: any): any | undefined;
}
