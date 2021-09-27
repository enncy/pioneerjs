# 指导指南



[toc]

## 关于

pioneerjs ——   pupeteer 的框架

<a>![NPM](https://img.shields.io/npm/l/pioneerjs) ![npm](https://img.shields.io/npm/v/pioneerjs)  ![npm bundle size](https://img.shields.io/bundlephobia/min/pioneerjs) ![npm](https://img.shields.io/npm/dw/@pioneerjs/core)</a>




 >Pioneerjs  是一个puppeteer框架，它使用依赖注入的原理来注入所有你需要的资源（页面、浏览器...等等）。

- Pioneerjs帮助你管理Puppeteer的 `browser` 和 `page` 对象。
- 它为每个可运行的脚本实例化并自动注入`page`、`browser`、`context` 对象
- 你可以继承 RunnableScript  来运行puppeteer代码，并用 `@Runnable('https://xxx.com')` 装饰器装饰它，然后传递到 pioneerjs 的 startup 方法里面运行。
- 你可以在任何 RunnableScript 中使用 InjectableScripts，并使用`@Inject`装饰器自动注入它们，不需要实例化，   InjectableScript 的  `page`、`browser`、`context` 对象与它所在的 RunnableScript 相同， InjectableScripts 通常扮演工具脚本的角色。





## 快速开始

```bash
# 初始化你的 package.json
npm init
```

```bash
# 添加依赖
npm install  puppeteer-core  @pioneerjs/core @pioneerjs/common
# 或者你可以直接添加整个 pioneerjs
npm install  puppeteer-core  pioneerjs
```


```bash
# 初始化 typescript config
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



创建  `app.ts`

```typescript

import { PioneerFactory } from "@pioneerjs/core";
import { TestScript } from "./src/test";

// 创建 Browser 对象并启动，然后传递给 Pioneer
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


创建 `src/test.ts`
```typescript
import { Injectable, Runnable, Inject } from "@pioneerjs/common";
import { InjectableScript, RunnableScript, WaitForScript } from "@pioneerjs/core";
import { Protocol } from "puppeteer-core";

// 创建你的新可注入脚本
@Injectable()
export class Spider extends InjectableScript {
    async getCookie(url: string): Promise<Protocol.Network.Cookie[]> {
        await this.page.goto(url)
        return await this.page.cookies()
    }
}

 /**
 * 创建一个新的可运行脚本  
 * @Runnable({url:"https://baidu.com"})  // 进入 "https://baidu.com"
 * 或者
 * @Runnable()  // 什么也不做
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
        // 这里会自动注入对象，所以你不需要实例化
        this.waitFor.sleep(3000)
        console.log(this.waitFor.page.url());

        // 可注入脚本和可运行脚本的 page browser context 对象都是相同的
        console.log(this.waitFor.page === this.page);

        // eventPool: 监听捕获 page 的事件对象
        console.log(this.context.eventPool.getEvents('request')?.length)

        // 不同脚本之间进行交互
        this.context.store.set('say', 'hello word')
        console.log(this.waitFor.context.store.get('say'))
    }
    // 当页面的 load 事件被触发时，执行此方法
    async update(): Promise<void> {
        console.log("update", this.page.url());
    }
}

```


```bash
# 构建你的应用
tsc
# 运行
node dist/index.js
```

输出类似下面 :
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



## Api

### PioneerFactory

>  pioneer 的构建工厂

**methods**

- `launch` 
  - `see`  [https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&show=api-puppeteerlaunchoptions](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&show=api-puppeteerlaunchoptions)
  - `return`  `Promise<Pioneer>`
- `connect` 
  - `see`  [https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&show=api-puppeteerlaunchoptions](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&show=api-puppeteerlaunchoptions)
  - `return ` `Promise<Pioneer>`

***

创建 Browser 并传递给 Pioneer 的构造器，返回一个 Pioneer 对象



### Pioneer

> 应用入口

**methods**

- `startup` : 启动整个应用 
  - `param`  options
    - `scripts : []`   可运行脚本数组，例如 scripts:[ClassA,ClassB]
    - `events : []`   需要在`context.eventPool` 开启捕获监听的页面事件数组 , 例如 events:['request','response']，事件会从浏览器开始到结束一直开始捕获，被捕获到的事件可以在`RunnableScript.context.eventPool.getEvents() ` 中获取
    - `log : boolean`  是否开启内置调试输出
    - `methodProxy : MethodProxy`











