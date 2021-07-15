"use strict";
/* eslint-disable @typescript-eslint/ban-types */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectPool = exports.Inject = void 0;
var Injectable_1 = require("./Injectable");
require("reflect-metadata");
var injectPool = new Array();
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
        // get propertyKey type
        var metadata = Reflect.getMetadata("design:type", target, propertyKey);
        // get InjectableScript  constructor
        var scriptConstructor = Injectable_1.InjectableScriptLoader.getScriptConstructor(metadata);
        // save in pool
        injectPool.push({ target: target, scriptConstructor: scriptConstructor, propertyKey: propertyKey });
    };
}
exports.Inject = Inject;
var InjectPool = /** @class */ (function () {
    function InjectPool() {
    }
    InjectPool.getInjectPool = function () {
        return injectPool;
    };
    return InjectPool;
}());
exports.InjectPool = InjectPool;
