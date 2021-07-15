/* eslint-disable @typescript-eslint/no-empty-function */
 
import { Inject,Injectable } from "@pioneerjs/common";
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
@Injectable()
export abstract class RunnableScript extends InjectableScript {
    url?: string

    @Inject()
    public waitFor!:WaitForScript

    /** called when browser page created*/
    startup(): void {
        (async () => {
            // listening destroyed
            this.page.once('close', () => this.destroyed())

            if (this.url && this.url !== '') {
                // listening load
                this.page.once('load', () => this.run())
                // goto the @Runnable's url value
                await this.page.goto(this.url)

            } else {
                this.run()
            }
            //callback
            this.created()

            // listening document update
            this.page.on('request', async req => {
                if(req.resourceType() === 'document'){
                    this.waitFor.nextTick('request',()=>{
                        this.update()
                    })
                }
            })
        })()

    }

    /** called when the {@link run()} function is called*/
    async created(): Promise<void> { }
    /** called when the window load  */
    abstract run(): Promise<void>
    /** called when browser page destroyed*/
    async update(): Promise<void> { }
    /** called when browser page destroyed*/
    async destroyed(): Promise<void> { }
}
