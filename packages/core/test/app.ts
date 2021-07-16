import { launch } from "puppeteer-core";
import { TestScript } from "./index";
 
import { Pioneer } from "..";
 



launch({
    // your chrome path
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", //"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    defaultViewport: null,
    headless: false,
}).then(async browser => {

    Pioneer.create(browser, {
        scripts: [TestScript],
        events: ['request']
    })

});