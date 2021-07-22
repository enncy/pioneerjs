"use strict";
/* eslint-disable @typescript-eslint/no-empty-function */
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunnableScript = void 0;
var waitfor_script_1 = require("./waitfor.script");
/**
 * runnable script , use @Runnable to decorator
 * example :
 * ```
 * @Runnable('https://google.com')
 * class TestScript extends RunnableScript{
 *
 *      async run():Promise<void>{
 *          console.log(this.page.url()) //https://google.com
 *      }
 *
 * }
 * ```
 */
var RunnableScript = /** @class */ (function () {
    function RunnableScript(_a) {
        var page = _a.page, browser = _a.browser, context = _a.context, name = _a.name;
        this.name = name;
        this.page = page;
        this.browser = browser;
        this.context = context;
    }
    /** called when browser page created*/
    RunnableScript.prototype.startup = function () {
        var _this = this;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var lisenningUpdate;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lisenningUpdate = function (req) {
                            if (req.resourceType() === 'document') {
                                var waitFor_1 = new waitfor_script_1.WaitForScript(_this);
                                waitFor_1.nextTick('request', function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, waitFor_1.documentReady()];
                                            case 1:
                                                _a.sent();
                                                this.update();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                            }
                        };
                        // listening destroyed
                        this.page.once('close', function () { return _this.destroyed(); });
                        if (!(this.url && this.url !== '')) return [3 /*break*/, 2];
                        // listening load
                        this.page.once('load', function () {
                            _this.run();
                            // listening document update
                            _this.page.on('request', lisenningUpdate);
                        });
                        // goto the @Runnable's url value
                        return [4 /*yield*/, this.page.goto(this.url)];
                    case 1:
                        // goto the @Runnable's url value
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.run();
                        // listening document update
                        this.page.on('request', lisenningUpdate);
                        _a.label = 3;
                    case 3:
                        //callback
                        this.created();
                        return [2 /*return*/];
                }
            });
        }); })();
    };
    /** called when the {@link run()} function is called*/
    RunnableScript.prototype.created = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    /** called when browser page destroyed*/
    RunnableScript.prototype.update = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    /** called when browser page destroyed*/
    RunnableScript.prototype.destroyed = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    return RunnableScript;
}());
exports.RunnableScript = RunnableScript;
