export interface Storage<T> {
    get(key: string): T | undefined;
    set(key: string, value: T): void;
}
export interface StorageEvents<T> {
    /** called when a value change */
    onChange(listener: (key: string, value: T) => void): void;
    /** if `key` is undefined, it will wait for value change*/
    waitForValue(key: string): Promise<T | undefined>;
}
