import { Injectable, Runnable, Inject } from "@pioneerjs/common";
import { InjectableScript, RunnableScript, WaitForScript } from "@pioneerjs/core";
import { Protocol } from "puppeteer-core";

// create your new script
@Injectable()
export class Spider extends InjectableScript {
    async getCookie(url: string): Promise<Protocol.Network.Cookie[]> {
        await this.page.goto(url)
        return await this.page.cookies()
    }
}

// create a new runnable script
@Runnable()
export class TestScript extends RunnableScript {

    @Inject()
    private mySpider!: Spider ;

    @Inject()
    private waitFor!: WaitForScript ;

    async run(): Promise<void> {
 
 
        console.log(await this.mySpider.getCookie("https://baidu.com")); // <html>...</html>
        console.log("waidForSleep");
        // auto inject you don't need to instance
        this.waitFor.sleep(3000)
        console.log(this.waitFor.page.url());

        // InjectableScript use same page,and context with RunnableScript
        console.log(this.waitFor.page === this.page);

        // eventPool: catch all the event
        console.log(this.context.eventPool.getEvents('request')?.length)

        // Script communication
        this.context.store.set('say', 'hello word')
        console.log(this.waitFor.context.store.get('say'))
    }
    // called when document change
    async update(): Promise<void> {
        console.log("update", this.page.url());
    }
}