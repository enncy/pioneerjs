import { EventEmitter } from 'events';

/**
 * storage the script value,    
 * you can use get and set to put any value to storage.   
 * when the value is updated it will callback a change function
 */
export class ScriptStorage implements Storage {
    private store: Map<any, any>
    private eventEmitter: EventEmitter

    constructor() {
        this.store = new Map<any, any>()
        this.eventEmitter = new EventEmitter()
    }
    /** get value */
    public get(key: any): any {
        return this.store.get(key)
    }
    /** set value */
    public set(key: any, value: any): void {
        this.store.set(key, value)
        this.eventEmitter.emit('change', value)
    }

    /**
     * it will callback when the set function is called
     * @param listener callback function
     */
    public onChange(listener: (value: any) => void) {
        this.eventEmitter.on('change', listener)
    }
}


export interface Storage {
    get(key: any): any
    set(key: any, value: any): any
}