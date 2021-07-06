
import { RunnableScript } from "../core/script/RunnableScript";

import { InjectableScriptLoader } from "./Injectable";
import 'reflect-metadata';
import { Script, ScriptConstructor } from "../core/script/Script";

const injectPool = new Array<{ targetConstructor: Function, propertyKey: string, scriptConstructor: ScriptConstructor<Script> | undefined }>()

/**
  * inject InjectableScript to RunnableScript,   
  * only use in RunnableScript,   
  * The `page`, `browser`, and `context` properties of RunnableScript are shared with InjectableScript
 
  * ```
  * // example
  * 
  * @Runnable('https://www.google.com/')
  * export class TestScript extends RunnableScript {    
  *     @Inject
  *     private waitFor?: WaitForScript  // auto inject
  *
  *     async run(): Promise<void> {
  *         console.log("waidForSleep");
  *         this.waitFor?.sleep(3000)  // sleep 3000
  *         console.log(this.waitFor?.page.url()); ///https://www.google.com/
  *         console.log(this.waitFor?.page  === this.page); // true
  *     }
  * }
  * ```
  * 
  */
export function Inject(target: RunnableScript, propertyKey: string) {

    // get propertyKey type
    const metadata = Reflect.getMetadata("design:type", target, propertyKey)
    // get InjectableScript  constructor
    const scriptConstructor = InjectableScriptLoader.getScriptConstructor(metadata)
    // save in pool
    injectPool.push({ targetConstructor: target.constructor, scriptConstructor, propertyKey })
}

export class InjectPool {
    static getInjectPool() {
        return injectPool
    }
}