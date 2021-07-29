
import { Page } from "puppeteer-core";
import { RunnableScript } from "../scripts";


export interface MethodProxyOptions<T> {
    keys?: (keyof T)[]
    handler?: (target: any, key: any, receiver: any) => void
}


/**
 * page or runnable script method proxy
 * @see PioneerProxy.methodProxy
 */
export interface MethodProxy {
    runnableScript?: MethodProxyOptions<RunnableScript>,
    page?: MethodProxyOptions<Page>
}

export class PioneerProxy {

    /**
     * target method proxy 
     * 
     * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
     * @param target target
     * @param options  {@link MethodProxyOptions}
     */
    public static methodProxy<T>(target: T, options?: MethodProxyOptions<T>): T {
        const keys: (keyof T)[] = options?.keys || []
        const proxyScript = new Proxy<any>(target, {
            get(target: any, key: any, receiver: any) {
                if (keys.includes(key)) {
                    return options?.handler?.(target, key, receiver)
                }
                return Reflect.get(target, key, receiver);
            }
        })
        return proxyScript
    }

}