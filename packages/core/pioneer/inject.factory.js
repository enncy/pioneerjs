"use strict";
exports.__esModule = true;
exports.InjectFactory = void 0;
var common_1 = require("@pioneerjs/common");
var InjectFactory = /** @class */ (function () {
    function InjectFactory() {
    }
    InjectFactory.create = function (target, propertyKey) {
        // get propertyKey type
        var constructor = Reflect.getMetadata("design:type", target, propertyKey);
        // only has @Injectable Function can use @Inject
        var injectableName = Reflect.getMetadata(common_1.INJECTABLE_NAME_SYMBOL, constructor);
        var injectTarget = InjectFactory.map.get(constructor);
        if (injectableName) {
            // if there is no such value in the map set
            if (!injectTarget) {
                // create new 
                var page = target.page, browser = target.browser, context = target.context;
                injectTarget = new constructor({ name: constructor.name, page: page, browser: browser, context: context });
                InjectFactory.map.set(constructor, injectTarget);
            }
        }
        return injectTarget;
    };
    InjectFactory.map = new Map();
    return InjectFactory;
}());
exports.InjectFactory = InjectFactory;
