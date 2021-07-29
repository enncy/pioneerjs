/* eslint-disable @typescript-eslint/no-empty-function */


import { InjectableScript } from "./injectable.script";

import { WaitForScript } from "./waitfor.script";
import 'reflect-metadata';
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

export interface RunnableScript {
    url?: string
    /** called when browser page created*/
    startup(): void
    /** called when browser page destroyed*/
    update(): Promise<void>
    /** called when browser page destroyed*/
    destroyed(): Promise<void>
}

export abstract class RunnableScript extends InjectableScript {
    url?: string


    /** called when browser page created*/
    startup(): void {
        (async () => {
            const waitFor = new WaitForScript(this)

            var lisenningLoad = async () => {
                await waitFor.documentReady()
                this.run()
                // listening document update
                this.page.on('load', async () => {
                    await waitFor.documentReady()
                    this.update()
                })
            }

            // listening destroyed
            this.page.once('close', () => this.destroyed())

            if (this.url && this.url !== '') {
                // listening first load
                this.page.once('load', lisenningLoad)
                // goto the @Runnable's url value
                await this.page.goto(this.url)
            } else {
                lisenningLoad()
            }

        })()

    }

    /** called when the window load  */
    abstract run(): Promise<void>
    /** called when browser page destroyed*/
    async update(): Promise<void> { }
    /** called when browser page destroyed*/
    async destroyed(): Promise<void> { }
}
