
import { Script, ScriptConstructor, ScriptOptions } from "./Script";


export class ScriptFactory {
    private static scripts: Map<string, Script> = new Map()

    public static createScript<T extends Script>(constructor: ScriptConstructor<T>, options: ScriptOptions) {

        const script = new constructor(options)
        this.scripts.set(script.name, script)
        return script
    }

    public static getScript<T extends Script>(name: string): T | undefined {
        return <T>this.scripts.get(name)
    }

}

