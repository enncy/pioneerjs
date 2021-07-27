/* eslint-disable @typescript-eslint/ban-types */


import { INJECTABLE_NAME_SYMBOL } from "@pioneerjs/common"
import { InjectableScript } from "../scripts/injectable.script"
import { RunnableScript } from "../scripts/runnable.script"
import { Script, ScriptConstructor, ScriptOptions } from "../scripts/script"
import { WaitForScript } from "../scripts/waitfor.script"


export interface NativeScripts {
    waitForScript: WaitForScript
    script: Script
    runnableScript: RunnableScript,
    InjectableScript: InjectableScript
}

/**
 * create script
 */
export class ScriptFactory {
    /**
     * create script
     * @param target decorator target class
     * @param propertyKey property key of  target class 
     */
    public static createInjectableScript<T extends InjectableScript>(target: T, propertyKey: string | symbol): any {
        // get propertyKey type

        const constructor = Reflect.getMetadata("design:type", target, propertyKey)
        // only has @Injectable Function can use @Inject
        const injectableName = Reflect.getMetadata(INJECTABLE_NAME_SYMBOL, constructor)
        let injectTarget = undefined
        if (injectableName) {
            // create new 
            let { page, browser, context } = target
            injectTarget = new constructor({ name: constructor.name, page, browser, context })
        }
        return injectTarget
    }

    public static createRunnableScript(constractor: ScriptConstructor<RunnableScript>, options: ScriptOptions) {
        return new constractor(options)
    }

}

