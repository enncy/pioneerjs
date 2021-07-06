





import puppeteer from 'puppeteer-core';
import { Pioneer } from './src/core/pioneer/Pioneer';
import { RunnableScript } from './src/core/script/RunnableScript';
import { WaitForScript } from './src/core/utils/WaitForScript';
import { Inject } from './src/decorator/Inject';
 
import { TestScript } from './test/test';





puppeteer.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    defaultViewport: null,
    headless: false,
}).then(async browser => {

    Pioneer.create(browser, {
        scripts: [TestScript],
        events: ['request']
    })

});

