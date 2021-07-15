"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptContext = void 0;
/** the script context of the pioneerjs
 * - `store` save script value  like localStorage
 * - `eventPool` save page event
 */
var ScriptContext = /** @class */ (function () {
    function ScriptContext(store, eventPool) {
        this.store = store;
        this.eventPool = eventPool;
    }
    return ScriptContext;
}());
exports.ScriptContext = ScriptContext;
