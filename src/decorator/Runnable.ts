
import { RunnableScript } from "../core/script/RunnableScript";
import { ScriptConstructor } from "../core/script/Script";


const runnableScripts: ScriptConstructor<RunnableScript>[] = []

/**
 * Runnable decorator, use in  RunnableScript
 * @see RunnableScript
 */
export function Runnable(url: string = "") {

    return function (constructor: ScriptConstructor<RunnableScript>) {
        constructor.prototype.url = url
        Reflect.defineMetadata("name", constructor.name, constructor)
        runnableScripts.push(constructor)
    }
}
