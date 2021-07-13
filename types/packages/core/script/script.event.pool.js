"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptEventPool = void 0;
/**
 * listening page event and save page event when browser is launch
 *
 * @example
 * ```
 * ScriptEventPool sep = new ScriptEventPool(page,'request','response',...)
 * ...
 * page.goto('https://google.com')
 * ...
 * sep.getEvents('request').forEach(req=>{
 *     console.log(req.url()) //https://google.com
 * })
 *
 * ```
 */
var ScriptEventPool = /** @class */ (function () {
    function ScriptEventPool(page, eventNames) {
        var _this = this;
        this.page = page;
        this.pool = new Map();
        eventNames === null || eventNames === void 0 ? void 0 : eventNames.forEach(function (name) { return _this.on(name); });
    }
    /** add event listener, and save event to eventpool*/
    ScriptEventPool.prototype.on = function (eventName) {
        var _this = this;
        return this.page.on(eventName, function (event) {
            var pool = _this.pool.get(eventName);
            if (pool) {
                pool.push(event);
                _this.pool.set(eventName, pool);
            }
            else {
                _this.pool.set(eventName, [event]);
            }
        });
    };
    /** remove event listener */
    ScriptEventPool.prototype.off = function (eventName) {
        return this.page.removeAllListeners(eventName);
    };
    /** get eventpool */
    ScriptEventPool.prototype.getEvents = function (eventName) {
        return this.pool.get(eventName);
    };
    /** set eventpool */
    ScriptEventPool.prototype.setEvents = function (eventName, value) {
        this.pool.set(eventName, value);
    };
    /** remove events, if you want to remove all the events, use {@link ScriptEventPool.removeAllEvents()} */
    ScriptEventPool.prototype.removeEvents = function () {
        var _this = this;
        var eventName = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            eventName[_i] = arguments[_i];
        }
        eventName.forEach(function (name) {
            _this.pool.delete(name);
        });
    };
    /** remove all event */
    ScriptEventPool.prototype.removeAllEvents = function () {
        this.pool.clear();
    };
    return ScriptEventPool;
}());
exports.ScriptEventPool = ScriptEventPool;
