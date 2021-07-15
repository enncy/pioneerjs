import { PageEventObject } from 'puppeteer-core';
import 'reflect-metadata';
export declare const RUN_EVENT_SYMBOL: unique symbol;
export declare const RUN_ONCE_EVENT_SYMBOL: unique symbol;
export declare function Run(event: keyof PageEventObject): MethodDecorator;
export declare function RunOnce(event: keyof PageEventObject): MethodDecorator;
