/* eslint-disable @typescript-eslint/ban-types */
import { RunnableScript } from "../scripts/RunnableScript"
import { ScriptConstructor } from "../scripts/Script"




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
