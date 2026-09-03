import {
  World,
  setWorldConstructor,
  type IWorldOptions
} from '@cucumber/cucumber';
import {
  chromium,
  type Browser,
  type BrowserContext,
  type Page
} from '@playwright/test';
import { POManager } from '../../pages/POManager';

export class CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  app?: POManager;
  orderId?: string;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async start(): Promise<void> {
    this.browser = await chromium.launch({
      headless: process.env.HEADLESS !== 'false'
    });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.app = new POManager(this.page);
  }

  async stop(): Promise<void> {
    await this.context?.close();
    await this.browser?.close();
  }
}

setWorldConstructor(CustomWorld);
