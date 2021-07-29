import { Injectable } from "@pioneerjs/common";
 
import { InjectableScript } from "./injectable.script";

 
@Injectable()
export class Utils extends InjectableScript {

    /**
     *  clear the input and type some value 
     * @param page browser page
     * @param selector element selector
     * @param value input value
     */
    public async type(selector: string, value: string): Promise<void> {

        // clear the input
        await this.page.click(selector, { clickCount: 3 })
        return await this.page.type(selector, value)
    }

    /**
 * get input value  if u want to set a new value u can  pass the new value in arg[newValue]
 * @param page browser page
 * @param selector element selector
 * @param newValue input new value
 */
    public async value(selector: string, newValue?: string): Promise<string> {
        if (newValue !== undefined) {
            const input = await this.page.$(selector);
            return await this.page.evaluate(
                (input: HTMLInputElement, newValue: string) => {
                    input.value = newValue
                    return input.value
                },
                input, newValue)
        }
        return await this.page.$eval(selector, el => (el as HTMLInputElement).value)
    }

    /**
     * get element innerHTML
     * @param page browser page
     * @param selector element selector
     */
    public async innerHTML(selector: string): Promise<string> {
        return await this.page.$eval(selector, el => el.innerHTML)
    }



    /**
     * get element innerText
     * @param page browser page
     * @param selector element selector
     */
    public async innerText(selector: string): Promise<string> {
        return await this.page.$eval(selector, el => (el as HTMLElement).innerText)
    }


    /**
     * get and set elemrnt attribute 
     * @param page browser page
     * @param selector element selector
     * @param attributeName element attribute name
     */
    public async attr(selector: string, attributeName: string): Promise<string> {
        return await this.page.$eval(selector, el => (el as any)[attributeName])
    }


    /**
     * get css value
     * @param page browser page
     * @param selector element selector
     * @param cssName element css name
     */
    public async css(selector: string, cssName: string): Promise<string> {
        const elemHandle = await this.page.$(selector);
        return await this.page.evaluate(
            (e: Element) => { return JSON.parse(JSON.stringify(window.getComputedStyle(e))) },
            elemHandle
        );
    }

}