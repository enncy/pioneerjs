"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Pioneer = void 0;
var common_1 = require("@pioneerjs/common");
var script_context_1 = require("../script/script.context");
var script_event_pool_1 = require("../script/script.event.pool");
var script_factory_1 = require("../script/script.factory");
var script_store_1 = require("../script/script.store");
var runnable_script_1 = require("../scripts/runnable.script");
require("reflect-metadata");
var inject_factory_1 = require("./inject.factory");
/**
 * the appliaction starter
 *
 */
var Pioneer = /** @class */ (function () {
    function Pioneer(browser, options) {
        var _this = this;
        this.browser = browser;
        this.options = options;
        // create pages 
        this.initPages(function (pages) {
            // init runnable script
            var runnableScripts = _this.initRunnableScript(pages);
            var injectableScripts = _this.initInjectableScript(runnableScripts);
            // start script
            for (var _i = 0, runnableScripts_1 = runnableScripts; _i < runnableScripts_1.length; _i++) {
                var script = runnableScripts_1[_i];
                script.startup();
                console.log("[pioneerjs]:script running - " + script.name);
            }
        });
    }
    /**
     * init runnable script, create script context and save script instance in ScriptFactory
     * @param pages  init pages {@link initPages()}
     */
    Pioneer.prototype.initRunnableScript = function (pages) {
        var scripts = [];
        var constructors = this.options.scripts;
        for (var _i = 0, constructors_1 = constructors; _i < constructors_1.length; _i++) {
            var constructor = constructors_1[_i];
            var page = pages.shift();
            if (page) {
                // create context
                var context = new script_context_1.ScriptContext(new script_store_1.Store(), new script_event_pool_1.ScriptEventPool(page, this.options.events));
                // instance
                var name_1 = Reflect.getMetadata(common_1.RUNNABLE_NAME_SYMBOL, constructor);
                var script = script_factory_1.ScriptFactory.createScript(constructor, { name: name_1, page: page, browser: this.browser, context: context });
                // startup
                scripts.push(script);
            }
        }
        return scripts;
    };
    /**
     * init injectable script
     * @see initScript()
     */
    Pioneer.prototype.initInjectableScript = function (runnableScripts) {
        var scripts = [];
        for (var _i = 0, runnableScripts_2 = runnableScripts; _i < runnableScripts_2.length; _i++) {
            var runableScript = runnableScripts_2[_i];
            var keys = Reflect.getMetadata(common_1.INJECT_KEYS_SYMBOL, runableScript);
            if (keys) {
                for (var _a = 0, keys_1 = keys; _a < keys_1.length; _a++) {
                    var key = keys_1[_a];
                    var injectScript = inject_factory_1.InjectFactory.create(runableScript, key);
                    scripts.push(injectScript);
                    Reflect.set(runableScript, key, injectScript);
                    console.log("[pioneerjs]:script injected - " + runableScript.name + "." + injectScript.name);
                }
            }
        }
        return scripts;
    };
    /** create pages  */
    Pioneer.prototype.initPages = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var pages, constructors, i, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.browser.pages()];
                    case 1:
                        pages = _c.sent();
                        constructors = this.options.scripts;
                        // remove RunnableScript
                        constructors = constructors.filter(function (i) { return i.name !== runnable_script_1.RunnableScript.name; });
                        i = 1;
                        _c.label = 2;
                    case 2:
                        if (!(i < constructors.length)) return [3 /*break*/, 5];
                        _b = (_a = pages).push;
                        return [4 /*yield*/, this.browser.newPage()];
                    case 3:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5:
                        callback(pages);
                        return [2 /*return*/, pages];
                }
            });
        });
    };
    /** static instance function */
    Pioneer.create = function (browser, options) {
        return new Pioneer(browser, options);
    };
    return Pioneer;
}());
exports.Pioneer = Pioneer;