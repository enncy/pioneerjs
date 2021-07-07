// // launch

import { launch } from "puppeteer-core";
import { TestScript } from ".";
import { Pioneer } from "../src/core/pioneer/Pioneer";
 

launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    defaultViewport: null,
    headless: false,
}).then(async browser => {

    Pioneer.create(browser, {
        scripts: [TestScript],
        events: ['request']
    })

}); 
