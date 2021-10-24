import { PageEventObject } from "puppeteer-core";
import { Injectable } from "@pioneerjs/common";
import { InjectableScript } from "./injectable.script";

@Injectable()
export class WaitForScript extends InjectableScript {
    /**
     * wait for document readystate becomes complete
     */
    async documentReady(): Promise<void> {
        let readyState: DocumentReadyState | undefined;
        while (readyState !== "complete") {
            this.sleep(1000);
            try {
                const document = await this.page.evaluateHandle("document");
                readyState = await this.page.evaluate((document) => document.readyState, document);
                // eslint-disable-next-line no-empty
            } catch {}
        }
    }

    /**
     * wait for window load
     */
    async load(): Promise<void> {
        return new Promise((resolve) => this.page.once("load", () => resolve()));
    }

    /** wait for sleep  */
    async sleep(timeout: number): Promise<void> {
        return new Promise((resolve) => setTimeout(() => resolve(), timeout));
    }

    /**
     * wait for next tick, if there are no event in a second, it will resolve
     */
    async nextTick(eventName: keyof PageEventObject): Promise<void> {
        return new Promise((resolve, reject) => {
            let eventPool = [];

            function eventHandler<T extends keyof PageEventObject>(event: PageEventObject[T]) {
                eventPool.push(event);
            }

            this.page.on(eventName, eventHandler);

            const i = setInterval(() => {
                if (eventPool.length > 0) {
                    eventPool = [];
                } else {
                    clearInterval(i);
                    this.page.off(eventName, eventHandler);
                    resolve();
                }
            }, 1000);
        });
    }
}
