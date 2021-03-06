import { Pioneer } from "@pioneerjs/core";
import { launch } from "puppeteer-core";
import { EventScript } from "./src";
 
 

launch({
    // your chrome path
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    defaultViewport: null,
    headless: false,
}).then(async browser => {

    Pioneer.create(browser, {
        scripts: [EventScript],
        events: ['request']
    })

});