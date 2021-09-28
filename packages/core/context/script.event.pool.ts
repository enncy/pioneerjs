import { EventEmitter, Page, PageEventObject } from "puppeteer-core";
import { EventPool } from "../interface/event.pool";

type PageEventObjects = PageEventObject[keyof PageEventObject]
type PageEventObjectKey = keyof PageEventObject

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
export class ScriptEventPool implements EventPool {

    private page: Page;
    private pool: Map<string, any[]>


    constructor(page: Page, eventNames?: PageEventObjectKey[]) {
        this.page = page
        this.pool = new Map()
        eventNames?.forEach(name => this.on(name, (event: PageEventObjects) => {
            const pool = this.pool.get(name) || []
            pool.push(event)
            this.pool.set(name, pool)
        }))
    }

    /** add event listener, and save event to eventpool*/
    public on<T extends keyof PageEventObject>(eventName: T, handler: (event: PageEventObject[T]) => void): EventEmitter {
        return this.page.on(eventName, handler)
    }

    /** remove event listener */
    public off<T extends keyof PageEventObject>(eventName: T): EventEmitter {
        return this.page.removeAllListeners(eventName)
    }

    /** get eventpool */
    public getEvents<T extends keyof PageEventObject>(eventName: T): PageEventObject[T][] | undefined {
        return this.pool.get(eventName)
    }

    /** set eventpool */
    public setEvents<T extends keyof PageEventObject>(eventName: T, value: PageEventObject[T][]): void {
        this.pool.set(eventName, value)
    }

    /** remove events, if you want to remove all the events, use {@link ScriptEventPool.removeAllEvents()} */
    public removeEvents<T extends keyof PageEventObject>(...eventName: T[]): void {
        eventName.forEach(name => {
            this.pool.delete(name)
        })
    }

    /** remove all event */
    public removeAllEvents(): void {
        this.pool.clear()
    }
}
