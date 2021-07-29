/* eslint-disable @typescript-eslint/ban-types */


import { INJECTABLE_NAME_SYMBOL } from "@pioneerjs/common"
import { InjectableScript, RunnableScript, Script, ScriptConstructor, ScriptOptions, Utils, WaitForScript } from "../scripts"
 
export interface NativeScripts {
    waitForScript: WaitForScript
    script: Script
    runnableScript: RunnableScript,
    InjectableScript: InjectableScript,
    utils: Utils
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

