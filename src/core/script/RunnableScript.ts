 
import { WaitForScript } from "../utils/WaitForScript";
import { InjectableScript } from "./InjectableScript";
import { ScriptFactory } from "./ScriptFactory";

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
                    const waitFor = ScriptFactory.getScript(WaitForScript)     
                    waitFor?.nextTick('request',()=>{
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
