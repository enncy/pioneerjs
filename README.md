# pioneerjs
pioneerjs - a puppeteer framework


## Quickly start

```shell
npm
```

```typescript

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

```