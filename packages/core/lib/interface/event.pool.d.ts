import { PageEventObject } from "puppeteer-core";
declare type PageEventObjects = PageEventObject[keyof PageEventObject];
declare type PageEventObjectKey = keyof PageEventObject;
export interface EventPool {
    /** add event listener, and save event to eventpool*/
    on(eventName: PageEventObjectKey): void;
    /** remove event listener */
    off(eventName: PageEventObjectKey): void;
    /** get eventpool */
    getEvents(eventName: PageEventObjectKey): PageEventObjects[] | undefined;
    /** set eventpool */
    setEvents(eventName: PageEventObjectKey, value: PageEventObjects[]): void;
    /** remove events, if you want to remove all the events, use {@link ScriptEventPool.removeAllEvents()} */
    removeEvents(...eventName: PageEventObjectKey[]): void;
    /** remove all event */
    removeAllEvents(): void;
}
export {};
