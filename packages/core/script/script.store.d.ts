import { Storage, StorageEvents } from '../interface/storage';
/**
 * storage the script value,
 * you can use get and set to put any value to storage.
 * when the value is updated it will callback a change function
 */
export declare class Store<T> implements Storage<T>, StorageEvents<T> {
    private store;
    private eventEmitter;
    constructor();
    /** get value */
    get(key: string): T | undefined;
    /** set value */
    set(key: string, value: T): void;
    /**
     * it will callback when the set function is called
     * @param listener callback function
     */
    onChange(listener: (key: string, value: T) => void): void;
    waitForValue(key: string): Promise<T>;
}
