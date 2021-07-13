import { EventEmitter } from 'events';
import { Storage, StorageEvents } from '../interface/storage';

/**
 * storage the script value,    
 * you can use get and set to put any value to storage.   
 * when the value is updated it will callback a change function
 */
export class Store<T> implements Storage<T>, StorageEvents<T> {
    private store: Map<string, T>
    private eventEmitter: EventEmitter

    constructor() {
        this.store = new Map<string, T>()
        this.eventEmitter = new EventEmitter()
    }

    /** get value */
    public get(key: string): T | undefined {
        return this.store.get(key)
    }
    /** set value */
    public set(key: string, value: T): void {
        this.store.set(key, value)
        this.eventEmitter.emit('change', key, value)
    }

    /**
     * it will callback when the set function is called
     * @param listener callback function
     */
    public onChange(listener: (key: string, value: T) => void): void {
        this.eventEmitter.on('change', listener)
    }

    public async waitForValue(key: string): Promise<T> {
        return new Promise((resolve) => {
            this.onChange((k, value) => {
                if (k === key) {
                    resolve(value)
                }
            })
        });
    }
}