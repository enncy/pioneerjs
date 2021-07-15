"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunOnce = exports.Run = exports.RUN_ONCE_EVENT_SYMBOL = exports.RUN_EVENT_SYMBOL = void 0;
require("reflect-metadata");
exports.RUN_EVENT_SYMBOL = Symbol("run.event");
exports.RUN_ONCE_EVENT_SYMBOL = Symbol("run.once.event");
function Run(event) {
    return RunDecorator(event, exports.RUN_EVENT_SYMBOL);
}
exports.Run = Run;
function RunOnce(event) {
    return RunDecorator(event, exports.RUN_ONCE_EVENT_SYMBOL);
}
exports.RunOnce = RunOnce;
function RunDecorator(event, metadateSymbol) {
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata(metadateSymbol, event, target, propertyKey);
    };
}
