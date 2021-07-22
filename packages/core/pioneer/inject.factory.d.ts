import { Script } from "../scripts/script";
export declare class InjectFactory {
    static map: Map<any, any>;
    static create<T extends Script>(target: T, propertyKey: string | symbol): any;
}
