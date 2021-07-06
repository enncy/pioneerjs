import { Injectable } from "../../decorator/Injectable";
import { InjectableScript } from "../script/InjectableScript";


@Injectable()
export class WaitForScript extends InjectableScript {

    /**
     * waitting window load
     */
    async load(): Promise<WaitForScript> {
        return new Promise(resolve => this.page.once('load', () => resolve(this)));
    }

    /** sleep  */
    async sleep(timeout: number): Promise<WaitForScript> {
        return new Promise(resolve => setTimeout(() => resolve(this), timeout));
    }
}




