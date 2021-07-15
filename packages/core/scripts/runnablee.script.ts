/* eslint-disable @typescript-eslint/no-empty-function */

import { Inject, Injectable } from "../../common";
 
<<<<<<< HEAD:packages/core/scripts/runnable.script.ts
import { Inject } from "@pioneerjs/common";
import { InjectableScript } from "./injectable.script";
import { WaitForScript } from "./waitfor.script";
=======

import { InjectableScript } from "./injectable.script";
import { WaitForScript } from "./waitfor.script";

>>>>>>> 928488426ae28020d0631bc5a52a712dd15b5635:packages/core/scripts/runnablee.script.ts

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

<<<<<<< HEAD:packages/core/scripts/runnable.script.ts
    @Inject()
    private waitFor!:WaitForScript
=======
    @Inject
    waitFor!: WaitForScript
>>>>>>> 928488426ae28020d0631bc5a52a712dd15b5635:packages/core/scripts/runnablee.script.ts

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
<<<<<<< HEAD:packages/core/scripts/runnable.script.ts
                if(req.resourceType() === 'document'){
                    this.waitFor.nextTick('request',()=>{
=======
                if (req.resourceType() === 'document') {
                    // const waitFor = ScriptFactory.getScript(WaitForScript)     
                    this.waitFor.nextTick('request', () => {
>>>>>>> 928488426ae28020d0631bc5a52a712dd15b5635:packages/core/scripts/runnablee.script.ts
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
