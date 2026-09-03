import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Given, Then, When } from '@cucumber/cucumber';
import { PageFixture } from '../../fixtures/page.fixture';
import { CustomWorld } from '../support/world';

function getPages(world: CustomWorld): PageFixture {
  if (!world.pages) {
    throw new Error('The page fixture was not initialized');
  }

  return world.pages;
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
    await getPages(this).automationPractice.open();
  }
);

Then(
  'the displayed text should be visible',
  async function (this: CustomWorld) {
    await getPages(this).automationPractice.expectDisplayedTextVisible();
  }
);

Then(
  'the hide button should match its approved visual snapshot',
  async function (this: CustomWorld) {
    const actual = await getPages(this).automationPractice.captureHideButton();

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
    await getPages(this).automationPractice.hideDisplayedText();
  }
);

Then(
  'the displayed text should be hidden',
  async function (this: CustomWorld) {
    await getPages(this).automationPractice.expectDisplayedTextHidden();
  }
);
