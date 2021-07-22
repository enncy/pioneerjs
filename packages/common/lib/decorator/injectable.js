"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injectable = exports.INJECTABLE_NAME_SYMBOL = void 0;
/* eslint-disable @typescript-eslint/ban-types */
require("reflect-metadata");
exports.INJECTABLE_NAME_SYMBOL = Symbol("injectable.name");
/**
 * Injectable decorator, use in  InjectableScript
 * @see InjectableScript
 */
function Injectable() {
    return function (constructor) {
        Reflect.defineMetadata(exports.INJECTABLE_NAME_SYMBOL, constructor.name, constructor);
    };
}
exports.Injectable = Injectable;
