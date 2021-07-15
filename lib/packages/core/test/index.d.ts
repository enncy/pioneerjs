import { Protocol } from "puppeteer-core";
import { InjectableScript, RunnableScript } from "..";
export declare class Spider extends InjectableScript {
    getCookie(url: string): Promise<Protocol.Network.Cookie[]>;
}
export declare class TestScript extends RunnableScript {
    private mySpider;
    private waitFor;
    run(): Promise<void>;
    update(): Promise<void>;
}
