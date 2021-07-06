import { launch } from "puppeteer-core";
import { Pioneer } from "../src/core/pioneer/Pioneer";
import { InjectableScript } from "../src/core/script/InjectableScript";
import { RunnableScript } from "../src/core/script/RunnableScript";
import { WaitForScript } from "../src/core/utils/WaitForScript";
import { Inject } from "../src/decorator/Inject";
import { Injectable } from "../src/decorator/Injectable";
import { Runnable } from "../src/decorator/Runnable";

// launch

launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    defaultViewport: null,
    headless: false,
}).then(async browser => {

    Pioneer.create(browser, {
        scripts: [TestScript],
        events: ['request']
    })

});




@Injectable()
export class Spider extends InjectableScript {
    async getHtml(url: string) {
        await this.page.goto(url)
        return await this.page.content()
    }
}

@Runnable("https://baidu.com")
export class TestScript extends RunnableScript {

    @Inject
    private mySpider!: Spider

    @Inject
    private waitFor!: WaitForScript

    async run(): Promise<void> {

        console.log(await this.mySpider.getHtml("https://baidu.com")); // <html>...</html>
        console.log("waidForSleep");
        // auto inject you don't need to instance
        this.waitFor.sleep(3000)
        console.log(this.waitFor.page.url());

        // InjectableScript use same page,and context with RunnableScript
        console.log(this.waitFor.page === this.page);

        // eventPool: catch all the event
        console.log(this.context.eventPool.getEvents('request')?.length)

        // Script communication
        this.context.storage.set('say', 'hello word')
        console.log(this.waitFor.context.storage.get('say'))
    }
    // called when document change
    async update() {
        console.log("update", this.page.url());
    }
}

