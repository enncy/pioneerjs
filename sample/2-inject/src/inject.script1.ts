import { Injectable } from "@pioneerjs/common";
import { InjectableScript } from "@pioneerjs/core";


@Injectable()
export class InjectScriptOne extends InjectableScript{
    say(){
        console.log("hello, i am InjectScriptOne");
    }
}