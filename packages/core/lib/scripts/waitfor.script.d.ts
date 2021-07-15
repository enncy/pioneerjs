import { PageEventObject } from "puppeteer-core";
import { InjectableScript } from "..";
export declare class WaitForScript extends InjectableScript {
    /**
     * wait for document readystate becomes complete
     */
    documentReady(): Promise<void>;
    /**
     * wait for window load
     */
    load(): Promise<void>;
    /** wait for sleep  */
    sleep(timeout: number): Promise<void>;
    /**
     * wait for next tick, if there are no event in a second, it will resolve
     */
    nextTick(eventName: keyof PageEventObject, callback: () => void): void;
}
