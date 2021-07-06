import { Page, PageEventObject } from "puppeteer-core";

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
export class ScriptEventPool {

    private page: Page;
    private pool: Map<PageEventObjectKey, PageEventObjects[]>


    constructor(page: Page, eventNames?: PageEventObjectKey[]) {
        this.page = page
        this.pool = new Map()
        eventNames?.forEach(name => this.on(name))
    }

    /** add event listener, and save event to eventpool*/
    public on(eventName: PageEventObjectKey) {
        this.page.on(eventName, (event: PageEventObjects) => {
            const pool = this.pool.get(eventName)
            if (pool) {
                pool.push(event)
                this.pool.set(eventName, pool)
            } else {
                this.pool.set(eventName, [event])
            }
        })
    }

    /** remove event listener */
    public off(eventName: PageEventObjectKey) {
        this.page.removeAllListeners(eventName)
    }

    /** get eventpool */
    public getEvents(eventName: PageEventObjectKey): PageEventObjects[] | undefined {
        return this.pool.get(eventName)
    }

    /** set eventpool */
    public setEvents(eventName: PageEventObjectKey, value: PageEventObjects[]) {
        return this.pool.set(eventName, value)
    }

    /** remove events, if you want to remove all the events, use {@link ScriptEventPool.removeAllEvents()} */
    public removeEvents(...eventName: PageEventObjectKey[]) {
        eventName.forEach(name => {
            this.pool.delete(name)
        })
    }

    /** remove all event */
    public removeAllEvents() {
        this.pool.clear()
    }


}