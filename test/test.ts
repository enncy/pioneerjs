import { RunnableScript } from "../src/core/script/RunnableScript";
import { WaitForScript } from "../src/core/utils/WaitForScript";
import { Inject } from "../src/decorator/Inject";
import { Runnable } from "../src/decorator/Runnable";

@Runnable("https://www.google.com/")
export class TestScript extends RunnableScript {

    @Inject
    waitFor?: WaitForScript

    async run(): Promise<void> {
        console.log("waidForSleep");
        this.waitFor?.sleep(3000)
         
        console.log(this.waitFor?.page.url());
        console.log(this.waitFor?.page  === this.page);
    }
}