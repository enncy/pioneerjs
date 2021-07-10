import { EventEmitter } from "puppeteer-core";
import { ScriptEventPool } from "./ScriptEventPool";
import { ScriptStorage, Storage } from "./ScriptStorage";

/** the script context of the pioneerjs   
 * - `storage` save script value  like localStorage
 * - `eventPool` save page event
 */
export class ScriptContext {

    public storage: ScriptStorage
    public eventPool: ScriptEventPool


    constructor(storage: ScriptStorage, eventPool: ScriptEventPool) {
        this.storage = storage
        this.eventPool = eventPool
    }

}
 