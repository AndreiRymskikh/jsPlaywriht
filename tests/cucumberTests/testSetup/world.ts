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
import { PageFixture } from '../../../fixtures/page.fixture';

export class CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  pages?: PageFixture;
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
    this.pages = new PageFixture(this.page);
  }

  async stop(): Promise<void> {
    await this.context?.close();
    await this.browser?.close();
  }
}

export function requirePages(world: CustomWorld): PageFixture {
  if (!world.pages) {
    throw new Error('The page fixture was not initialized');
  }

  return world.pages;
}

setWorldConstructor(CustomWorld);
