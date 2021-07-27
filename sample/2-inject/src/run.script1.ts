import { Inject, Injectable, Runnable } from "@pioneerjs/common";
import { RunnableScript } from "@pioneerjs/core";
import { InjectScriptOne } from "./inject.script1";
import { InjectScriptTwo } from "./inject.script2";


@Runnable()
@Injectable()
export class RunScriptOne extends RunnableScript {

    @Inject()
    public one!: InjectScriptOne ;

    @Inject()
    public two!: InjectScriptTwo ;

    async run(): Promise<void> {
        console.log("hello, i am RunScriptOne");
        this.one.say()
        this.two.say()
    }

}