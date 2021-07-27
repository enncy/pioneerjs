import { Inject, Runnable } from "@pioneerjs/common";
import { RunnableScript } from "@pioneerjs/core";
import { RunScriptOne } from "./run.script1";


@Runnable()
export class RunScriptTow extends RunnableScript {

    @Inject()
    public runOne!: RunScriptOne

    async run(): Promise<void> {
        console.log("hello, i am RunScriptTow");
        console.log(this.runOne.one);
        
    }

}