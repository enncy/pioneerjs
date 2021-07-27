import { Injectable } from "@pioneerjs/common";
import { InjectableScript } from "@pioneerjs/core";


@Injectable()
export class InjectScriptTwo extends InjectableScript{
    say(){
        console.log("hello, i am InjectScriptTwo");
    }
}