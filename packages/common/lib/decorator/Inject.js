"use strict";
/* eslint-disable @typescript-eslint/ban-types */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inject = exports.INJECT_KEYS_SYMBOL = exports.INJECT_NAME_SYMBOL = void 0;
require("reflect-metadata");
exports.INJECT_NAME_SYMBOL = Symbol("inject.name");
exports.INJECT_KEYS_SYMBOL = Symbol("inject.keys");
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
function Inject() {
    return function (target, propertyKey) {
        Reflect.defineMetadata(exports.INJECT_NAME_SYMBOL, target.constructor.name, target);
        var keys = Reflect.getMetadata(exports.INJECT_KEYS_SYMBOL, target);
        if (keys) {
            keys.push(propertyKey);
            Reflect.defineMetadata(exports.INJECT_KEYS_SYMBOL, keys, target);
        }
        else {
            Reflect.defineMetadata(exports.INJECT_KEYS_SYMBOL, [propertyKey], target);
        }
    };
}
exports.Inject = Inject;
