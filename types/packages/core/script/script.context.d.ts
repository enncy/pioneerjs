import { ScriptEventPool } from "./script.event.pool";
import { Store } from "./script.store";
/** the script context of the pioneerjs
 * - `store` save script value  like localStorage
 * - `eventPool` save page event
 */
export declare class ScriptContext {
    store: Store<unknown>;
    eventPool: ScriptEventPool;
    constructor(store: Store<unknown>, eventPool: ScriptEventPool);
}
