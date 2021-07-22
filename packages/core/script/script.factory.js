"use strict";
/* eslint-disable @typescript-eslint/ban-types */
exports.__esModule = true;
exports.ScriptFactory = void 0;
/**
 * create script
 */
var ScriptFactory = /** @class */ (function () {
    function ScriptFactory() {
    }
    /**
     * create script
     * @param constructor script constructor,  {@link Runnable}
     * @param options script instance options
     */
    ScriptFactory.createScript = function (constructor, options) {
        var script = new constructor(options);
        this.scripts.set(script.name, script);
        return script;
    };
    /**
     * get script by name
     * @param name script constructor name
     * ```
     * // example
     * // this script name must be RunnableScript child class name
     * ScriptFactory.getScript('TestScript') // TestScript
     * ```
     */
    ScriptFactory.getScript = function (constructor) {
        return this.scripts.get(constructor.name);
    };
    ScriptFactory.getScriptByName = function (name) {
        return this.scripts.get(name);
    };
    /** map */
    ScriptFactory.scripts = new Map();
    return ScriptFactory;
}());
exports.ScriptFactory = ScriptFactory;
