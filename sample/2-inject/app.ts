import { Pioneer } from "@pioneerjs/core";
import { launch } from "puppeteer-core";
import { RunScriptOne } from "./src/run.script1";
import { RunScriptTow } from "./src/run.script2";
 

launch({
    // your chrome path
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    defaultViewport: null,
    headless: false,
}).then(async browser => {

    Pioneer.create(browser, {
        scripts: [RunScriptOne,RunScriptTow],
        events: ['request']
    })

});