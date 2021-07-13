import { InjectableScript } from "./injectable.script";
import { WaitForScript } from "./waitfor.script";
/**
 * runnable script , use @Runnable to decorator
 * example :
 * ```
 * @Runnable('https://google.com')
 * class TestScript extends RunnableScript{
 *
 *      async run():Promise<void>{
 *          console.log(this.page.url()) //https://google.com
 *      }
 *
 * }
 * ```
 */
export declare abstract class RunnableScript extends InjectableScript {
    url?: string;
    waitFor: WaitForScript;
    /** called when browser page created*/
    startup(): void;
    /** called when the {@link run()} function is called*/
    created(): Promise<void>;
    /** called when the window load  */
    abstract run(): Promise<void>;
    /** called when browser page destroyed*/
    update(): Promise<void>;
    /** called when browser page destroyed*/
    destroyed(): Promise<void>;
}
