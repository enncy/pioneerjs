import { Injectable } from "@pioneerjs/common";
import { InjectableScript } from "@pioneerjs/core";
import axios from 'axios';



@Injectable()
export class Spider extends InjectableScript {
    async html(url?: string): Promise<string | undefined> {
        if (url) {
            return (await axios.get(url)).data
        } else {
            return this.page.content()
        }
    }
}