/* eslint-disable @typescript-eslint/ban-types */
import { RunnableScript } from "../../core/scripts/runnablee.script"
import { ScriptConstructor } from "../../core/scripts/script"




const runnableScripts: ScriptConstructor<RunnableScript>[] = []

/**
 * Runnable decorator, use in  RunnableScript
 * @see RunnableScript
 */
export function Runnable(url = ""): Function {

    return function (constructor: ScriptConstructor<RunnableScript>): void {
        constructor.prototype.url = url
        Reflect.defineMetadata("name", constructor.name, constructor)
        runnableScripts.push(constructor)
    }
}
