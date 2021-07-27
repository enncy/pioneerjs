import { Event, Runnable } from "@pioneerjs/common";
import { RunnableScript } from "@pioneerjs/core"
import { PageEventObject } from "puppeteer-core";



@Runnable({ url: 'https://www.baidu.com' })
export class EventScript extends RunnableScript {
    async run(): Promise<void> {
        console.log("run");
    }

    @Event({ name: 'console' })
    load(event: PageEventObject['console']) {
        console.log("event", event);

    }

}

