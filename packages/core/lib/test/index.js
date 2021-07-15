"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.TestScript = exports.Spider = void 0;
var common_1 = require("@pioneerjs/common");
var __1 = require("..");
var waitfor_script_1 = require("../scripts/waitfor.script");
var Spider = /** @class */ (function (_super) {
    __extends(Spider, _super);
    function Spider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Spider.prototype.getCookie = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.goto(url)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.page.cookies()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Spider = __decorate([
        common_1.Injectable()
    ], Spider);
    return Spider;
}(__1.InjectableScript));
exports.Spider = Spider;
var TestScript = /** @class */ (function (_super) {
    __extends(TestScript, _super);
    function TestScript() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestScript.prototype.run = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _c = (_b = console).log;
                        return [4 /*yield*/, this.mySpider.getCookie("https://baidu.com")];
                    case 1:
                        _c.apply(_b, [_d.sent()]); // <html>...</html>
                        console.log("waidForSleep");
                        // auto inject you don't need to instance
                        this.waitFor.sleep(3000);
                        console.log(this.waitFor.page.url());
                        // InjectableScript use same page,and context with RunnableScript
                        console.log(this.waitFor.page === this.page);
                        // eventPool: catch all the event
                        console.log((_a = this.context.eventPool.getEvents('request')) === null || _a === void 0 ? void 0 : _a.length);
                        // Script communication
                        this.context.store.set('say', 'hello word');
                        console.log(this.waitFor.context.store.get('say'));
                        return [2 /*return*/];
                }
            });
        });
    };
    // called when document change
    TestScript.prototype.update = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("update", this.page.url());
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        common_1.Inject(),
        __metadata("design:type", Spider)
    ], TestScript.prototype, "mySpider", void 0);
    __decorate([
        common_1.Inject(),
        __metadata("design:type", waitfor_script_1.WaitForScript)
    ], TestScript.prototype, "waitFor", void 0);
    TestScript = __decorate([
        common_1.Runnable("https://baidu.com")
    ], TestScript);
    return TestScript;
}(__1.RunnableScript));
exports.TestScript = TestScript;