import { LaunchOptions, BrowserLaunchArgumentOptions, BrowserConnectOptions, Product, ConnectOptions, launch, connect } from "puppeteer-core";
import { Pioneer } from "./pioneer";




export class PioneerFactory {

    public static launch(options?: LaunchOptions & BrowserLaunchArgumentOptions & BrowserConnectOptions & {
        product?: Product;
        extraPrefsFirefox?: Record<string, unknown>;
    }): Promise<Pioneer> {
        return new Promise(async (resolve) => {
            const browser = await launch(options)
            resolve(Pioneer.create(browser))
        });
    }

    public static connect(options: ConnectOptions): Promise<Pioneer> {
        return new Promise(async (resolve) => {
            const browser = await connect(options)
            resolve(Pioneer.create(browser))
        });
    }



}

