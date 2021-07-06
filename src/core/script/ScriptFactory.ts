
import { Script, ScriptConstructor, ScriptOptions } from "./Script";

/**
 * create script
 */
export class ScriptFactory {
    /** map */
    private static scripts: Map<string, Script> = new Map()

    /**
     * create script 
     * @param constructor script constructor,  {@link Runnable}
     * @param options script instance options
     */
    public static createScript<T extends Script>(constructor: ScriptConstructor<T>, options: ScriptOptions) {
        const script = new constructor(options)
        this.scripts.set(script.name, script)
        return script
    }

    /**
     * get script by name
     * @param name script constructor name  
     * ```
     * // example
     * // this script name must be RunnableScript child class name
     * ScriptFactory.getScript('TestScript') // TestScript
     * ```
     */
    public static getScript<T extends Script>(constructor: ScriptConstructor<T> | Function): T | undefined {
        return <T>this.scripts.get(constructor.name)
    }

    public static getScriptByName<T extends Script>(name: string): T | undefined {
        return <T>this.scripts.get(name)
    }

}
