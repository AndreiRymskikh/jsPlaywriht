import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Given, Then, When } from '@cucumber/cucumber';
import { POManager } from '../../pages/POManager';
import { CustomWorld } from '../support/world';

function getApp(world: CustomWorld): POManager {
  if (!world.app) {
    throw new Error('The test application was not initialized');
  }

  return world.app;
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
    await getApp(this).automationPractice.open();
  }
);

Then(
  'the displayed text should be visible',
  async function (this: CustomWorld) {
    await getApp(this).automationPractice.expectDisplayedTextVisible();
  }
);

Then(
  'the hide button should match its approved visual snapshot',
  async function (this: CustomWorld) {
    const actual = await getApp(this).automationPractice.captureHideButton();

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
    await getApp(this).automationPractice.hideDisplayedText();
  }
);

Then(
  'the displayed text should be hidden',
  async function (this: CustomWorld) {
    await getApp(this).automationPractice.expectDisplayedTextHidden();
  }
);
