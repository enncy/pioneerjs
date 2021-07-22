import { EventEmitter, Page, PageEventObject } from "puppeteer-core";
import { EventPool } from "../interface/event.pool";
declare type PageEventObjects = PageEventObject[keyof PageEventObject];
declare type PageEventObjectKey = keyof PageEventObject;
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
export declare class ScriptEventPool implements EventPool {
    private page;
    private pool;
    constructor(page: Page, eventNames?: PageEventObjectKey[]);
    /** add event listener, and save event to eventpool*/
    on(eventName: PageEventObjectKey): EventEmitter;
    /** remove event listener */
    off(eventName: PageEventObjectKey): EventEmitter;
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
