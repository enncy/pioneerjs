import { INJECTABLE_NAME_SYMBOL } from "@pioneerjs/common"
import { Script } from "../scripts/script"

export class InjectFactory {
    public static map = new Map()

    public static create<T extends Script>(target: T, propertyKey: string | symbol): any {
        // get propertyKey type

        const constructor = Reflect.getMetadata("design:type", target, propertyKey)
        // only has @Injectable Function can use @Inject
        const injectableName = Reflect.getMetadata(INJECTABLE_NAME_SYMBOL, constructor)
        let injectTarget = InjectFactory.map.get(constructor)
        if (injectableName) {
            // if there is no such value in the map set
            if (!injectTarget) {
                // create new 
                let { page, browser, context } = target
                injectTarget = new constructor({ name: constructor.name, page, browser, context })
                InjectFactory.map.set(constructor, injectTarget)
            }
        }
        return injectTarget
    }
}