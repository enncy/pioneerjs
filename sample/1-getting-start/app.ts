import { PioneerFactory } from "@pioneerjs/core";
import { TestScript } from "./src/test";


PioneerFactory.launch({
    // your chrome path
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    defaultViewport: null,
    headless: false,
}).then(async pioneer => {

    pioneer.startup({
        scripts: [TestScript],
        events: ['request']
    })
})
