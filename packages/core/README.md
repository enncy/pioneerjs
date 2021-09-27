# pioneerjs
pioneerjs - a puppeteer framework

<a>![NPM](https://img.shields.io/npm/l/pioneerjs) ![npm](https://img.shields.io/npm/v/pioneerjs)  ![npm bundle size](https://img.shields.io/bundlephobia/min/pioneerjs) ![npm](https://img.shields.io/npm/dw/@pioneerjs/core)</a>




 >Pioneerjs is a puppeteer framework that uses the principle of Dependency Injection to inject all the resources(page,browser,...) you need.

- Pioneerjs helps you to manage the `Browser` and `Page` objects of Puppeteer
- It instantiates and automatically injects Page, Browser, ScriptContext objects for each runnable script
- You can use RunnableScript to run the puppeteer code and start it with     @Runnable('https://xxx.com') decorator
- You can use InjectableScripts in any RunnableScript and inject them automatically using the @Inject decorator, no instantiation is needed, the Page, Browser, ScriptContext objects of an InjectableScript are the same as in the RunnableScript it is in, and InjectableScripts generally play the role of tool scripts



## Getting Started

```bash
# init your package.json
npm init
```

```bash
# install dependencies
npm install  puppeteer-core  @pioneerjs/core @pioneerjs/common
# or you can just install pioneerjs
npm install  puppeteer-core  pioneerjs
```


```bash
# init typescript config
tsc --init
```
`tscondig.json`

```json
{
  "compilerOptions": {
    "target": "es5", 
    "module": "commonjs",
    "outDir": "./dist", 
    "strict": true,
    "esModuleInterop": true, 
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true 
  }
}
```



create  `app.ts`

```typescript


import { PioneerFactory } from "@pioneerjs/core";
import { TestScript } from "./src/test";


PioneerFactory.launch({
    // your chrome path
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    defaultViewport: null,
    headless: false,
}).then(async pioneer => {

    pioneer.startup({
        scripts: [TestScript],
        events: ['request']
    })
})


```


create `src/test.ts`
```typescript
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

 /**
 * create a new runnable script  
 * @Runnable({url:"https://baidu.com"})  // goto "https://baidu.com"
 * or
 * @Runnable()  // do nothing
 */ 
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

```


```bash
# build your project
tsc
# run
node dist/index.js
```

out put like this :
```
[pioneerjs]:script injected - TestScript.Spider
[pioneerjs]:script injected - TestScript.WaitForScript
[pioneerjs]:script running - TestScript
[
  xxx
]
waidForSleep
https://www.baidu.com/
true
43
hello word
update https://www.baidu.com/
```
