/* eslint-disable @typescript-eslint/ban-types */

import 'reflect-metadata';


export const INJECT_NAME_SYMBOL = Symbol("inject.name")
export const INJECT_KEYS_SYMBOL = Symbol("inject.keys")
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
export function Inject(): PropertyDecorator {
    return function (target: any, propertyKey: string | symbol): void {
        Reflect.defineMetadata(INJECT_NAME_SYMBOL, target.constructor.name, target)
        const keys: any[] = Reflect.getMetadata(INJECT_KEYS_SYMBOL, target)
        if (keys) {
            keys.push(propertyKey)
            Reflect.defineMetadata(INJECT_KEYS_SYMBOL, keys, target)
        } else {
            Reflect.defineMetadata(INJECT_KEYS_SYMBOL, [propertyKey], target)
        }

    }
}
