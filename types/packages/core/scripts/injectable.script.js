"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectableScript = void 0;
/**
 *  injectable script, use in runnable script like tool or utils
 * example :
 * ```
 * // in this case , TestScript is RunnableScript, and WaitForScript is InjectableScript
 * @Runnable('https://www.google.com/')
 * export class TestScript extends RunnableScript {
 *     @Inject
 *     private waitFor?: WaitForScript  // auto inject InjectableScript
 *
 *     async run(): Promise<void> {
 *         console.log("waidForSleep");
 *         this.waitFor?.sleep(3000)  // sleep 3000
 *         console.log(this.waitFor?.page.url()); ///https://www.google.com/
 *         console.log(this.waitFor?.page  === this.page); // true
 *     }
 * }
 * ```
 */
var InjectableScript = /** @class */ (function () {
    function InjectableScript(_a) {
        var page = _a.page, browser = _a.browser, context = _a.context, name = _a.name;
        this.name = name;
        this.page = page;
        this.browser = browser;
        this.context = context;
    }
    return InjectableScript;
}());
exports.InjectableScript = InjectableScript;
