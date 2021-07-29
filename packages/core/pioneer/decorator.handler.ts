import { EVENT_METHOD_KEYS_SYMBOL, EVENT_NAME_SYMBOL, EventOptions, EVENT_OPTIONS_SYMBOL } from "@pioneerjs/common"
import { Script } from "../scripts/script"
 

export class DecoratorHandler {

    public static handleEventDecorator<T extends Script>(script: T): void {
        // execute event decorator
        const eventKeys = Reflect.getMetadata(EVENT_METHOD_KEYS_SYMBOL, script)
        if (eventKeys) {
            eventKeys.forEach((key: string | symbol) => {
                const eventName = Reflect.getMetadata(EVENT_NAME_SYMBOL, script, key)
                const eventOptions: EventOptions = Reflect.getMetadata(EVENT_OPTIONS_SYMBOL, script, key)
                const name = eventName || eventOptions?.name
                if (name) {
                    script.page.on(name, (event) => {
                        script[(key as string)](event)
                    })
                }
            })
        }
    }

    public static handleEventDecorators<T extends Script>(script: T[]): void {
        script.forEach(i => DecoratorHandler.handleEventDecorator(i))
    }
}