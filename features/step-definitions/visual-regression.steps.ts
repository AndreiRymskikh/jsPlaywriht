import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Given, Then, When } from '@cucumber/cucumber';
import { expect, type Page } from '@playwright/test';
import { CustomWorld } from '../support/world';

function getPage(world: CustomWorld): Page {
  if (!world.page) {
    throw new Error('The browser page was not initialized');
  }

  return world.page;
}

function visualBaselinePath(): string {
  const platform = process.platform === 'darwin' ? 'darwin' : 'linux';

  return path.resolve(
    'tests/visual/visual.spec.ts-snapshots',
    `hide-button-chromium-${platform}.png`
  );
}

Given(
  'the user opens the Automation Practice page',
  async function (this: CustomWorld) {
    await getPage(this).goto(
      'https://rahulshettyacademy.com/AutomationPractice/'
    );
  }
);

Then(
  'the displayed text should be visible',
  async function (this: CustomWorld) {
    await expect(getPage(this).locator('#displayed-text')).toBeVisible();
  }
);

Then(
  'the hide button should match its approved visual snapshot',
  async function (this: CustomWorld) {
    const actual = await getPage(this).locator('#hide-textbox').screenshot({
      animations: 'disabled'
    });

    let expected: Buffer;
    try {
      expected = await readFile(visualBaselinePath());
    } catch {
      await this.attach(actual, 'image/png');
      throw new Error(
        `Visual baseline is missing: ${visualBaselinePath()}. Generate it with "npm test -- tests/visual/visual.spec.ts --update-snapshots".`
      );
    }

    if (!actual.equals(expected)) {
      await this.attach(actual, 'image/png');
      throw new Error(
        `The hide button does not match its approved snapshot: ${visualBaselinePath()}`
      );
    }
  }
);

When(
  'the user clicks the hide button',
  async function (this: CustomWorld) {
    await getPage(this).locator('#hide-textbox').click();
  }
);

Then(
  'the displayed text should be hidden',
  async function (this: CustomWorld) {
    await expect(getPage(this).locator('#displayed-text')).toBeHidden();
  }
);
