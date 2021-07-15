import { InjectableScript, RunnableScript } from "./packages/core";
export declare class Spider extends InjectableScript {
    getHtml(url: string): Promise<string>;
}
export declare class TestScript extends RunnableScript {
    private mySpider;
    run(): Promise<void>;
    update(): Promise<void>;
}
