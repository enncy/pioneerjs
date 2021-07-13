"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Runnable = void 0;
var runnableScripts = [];
/**
 * Runnable decorator, use in  RunnableScript
 * @see RunnableScript
 */
function Runnable(url) {
    if (url === void 0) { url = ""; }
    return function (constructor) {
        constructor.prototype.url = url;
        Reflect.defineMetadata("name", constructor.name, constructor);
        runnableScripts.push(constructor);
    };
}
exports.Runnable = Runnable;
