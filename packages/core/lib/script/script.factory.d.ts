import { Script, ScriptConstructor, ScriptOptions } from "../scripts";
/**
 * create script
 */
export declare class ScriptFactory {
    /** map */
    private static scripts;
    /**
     * create script
     * @param constructor script constructor,  {@link Runnable}
     * @param options script instance options
     */
    static createScript<T extends Script>(constructor: ScriptConstructor<T>, options: ScriptOptions): T;
    /**
     * get script by name
     * @param name script constructor name
     * ```
     * // example
     * // this script name must be RunnableScript child class name
     * ScriptFactory.getScript('TestScript') // TestScript
     * ```
     */
    static getScript<T extends Script>(constructor: ScriptConstructor<T> | Function): T | undefined;
    static getScriptByName<T extends Script>(name: string): T | undefined;
}