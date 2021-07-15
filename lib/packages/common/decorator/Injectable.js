"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectableScriptLoader = exports.Injectable = void 0;
/* eslint-disable @typescript-eslint/ban-types */
require("reflect-metadata");
var injectableScriptConstructors = [];
/**
 * Injectable decorator, use in  InjectableScript
 * @see InjectableScript
 */
function Injectable() {
    return function (constructor) {
        Reflect.defineMetadata("name", constructor.name, constructor);
        injectableScriptConstructors.push(constructor);
    };
}
exports.Injectable = Injectable;
var InjectableScriptLoader = /** @class */ (function () {
    function InjectableScriptLoader() {
    }
    InjectableScriptLoader.getScriptConstructors = function () {
        return injectableScriptConstructors;
    };
    InjectableScriptLoader.getScriptConstructor = function (constructor) {
        return injectableScriptConstructors.find(function (i) { return i.name === constructor.name; });
    };
    return InjectableScriptLoader;
}());
exports.InjectableScriptLoader = InjectableScriptLoader;
