import { launch } from "puppeteer-core";
import { TestScript } from ".";

import { Pioneer } from "..";



launch({
    // your chrome path
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    defaultViewport: null,
    headless: false,
}).then(async browser => {

    Pioneer.create(browser, {
        scripts: [TestScript],
        events: ['request']
    })

});