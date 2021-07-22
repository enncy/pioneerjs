"use strict";
/* eslint-disable @typescript-eslint/ban-types */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Runnable = exports.RUNNABLE_NAME_SYMBOL = exports.RUNNABLE_URL_SYMBOL = void 0;
var runnableScriptConstructors = [];
exports.RUNNABLE_URL_SYMBOL = Symbol("runnable.url");
exports.RUNNABLE_NAME_SYMBOL = Symbol("runnable.name");
/**
 * Runnable decorator, use in  RunnableScript
 * @see RunnableScript
 */
function Runnable(options) {
    return function (constructor) {
        if (options === null || options === void 0 ? void 0 : options.url) {
            constructor.prototype.url = options.url;
            Reflect.defineMetadata(exports.RUNNABLE_URL_SYMBOL, options.url, constructor);
        }
        Reflect.defineMetadata(exports.RUNNABLE_NAME_SYMBOL, constructor.name, constructor);
        runnableScriptConstructors.push(constructor);
    };
}
exports.Runnable = Runnable;
