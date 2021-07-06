
import { InjectableScript } from "./InjectableScript";

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
export abstract class RunnableScript extends InjectableScript {
    url?: string

    /** called when browser page created*/
    startup(): void {
        // update
        this.page.once('load', () => this.run())
        //destroyed
        this.page.once('close', () => this.destroyed())

        // goto the @Runnable's url value
        if (this.url) {
            this.page.goto(this.url)
        }
        //callback
        this.created()
    }

    /** called when the {@link run()} function is called*/
    created(): void { }
    /** called when the window load  */
    abstract run(): Promise<void>
    /** called when browser page destroyed*/
    update(): void { }
    /** called when browser page destroyed*/
    destroyed(): void { }
}
