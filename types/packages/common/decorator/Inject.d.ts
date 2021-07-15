import { RunnableScript } from "../../core/scripts/runnablee.script";
import 'reflect-metadata';
import { Script, ScriptConstructor } from "../../core/scripts/script";
declare type InjectObjects = {
    target: RunnableScript;
    propertyKey: string;
    scriptConstructor: ScriptConstructor<Script> | undefined;
};
/**
  * inject InjectableScript to RunnableScript,
  * only use in RunnableScript,
  * The `page`, `browser`, and `context` properties of RunnableScript are shared with InjectableScript
 
  * ```
  * // example
  *
  * @Runnable('https://www.google.com/')
  * export class TestScript extends RunnableScript {
  *     @Inject
  *     private waitFor?: WaitForScript  // auto inject
  *
  *     async run(): Promise<void> {
  *         console.log("waidForSleep");
  *         this.waitFor?.sleep(3000)  // sleep 3000
  *         console.log(this.waitFor?.page.url()); ///https://www.google.com/
  *         console.log(this.waitFor?.page  === this.page); // true
  *     }
  * }
  * ```
  *
  */
export declare function Inject(target: RunnableScript, propertyKey: string): void;
export declare class InjectPool {
    static getInjectPool(): Array<InjectObjects>;
}
export {};
