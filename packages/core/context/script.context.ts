 
import { ScriptEventPool } from "./script.event.pool";
import { Store } from "./script.store";

/** the script context of the pioneerjs   
 * - `store` save script value  like localStorage
 * - `eventPool` save page event
 */
export class ScriptContext {

    public store: Store<unknown>
    public eventPool: ScriptEventPool


    constructor(store: Store<unknown>, eventPool: ScriptEventPool) {
        this.store = store
        this.eventPool = eventPool
    }

}
