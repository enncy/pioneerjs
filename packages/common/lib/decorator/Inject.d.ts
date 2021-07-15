import 'reflect-metadata';
declare type InjectObjects = {
    target: Object;
    propertyKey: string | symbol;
    scriptConstructor: any | undefined;
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
export declare function Inject(): PropertyDecorator;
export declare class InjectPool {
    static getInjectPool(): Array<InjectObjects>;
}
export {};
