import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Given, Then, When } from '@cucumber/cucumber';
import {
  CustomWorld,
  requirePages
} from '../cucumberTests/support/world';

function visualBaselinePath(): string {
  const platform = process.platform === 'darwin' ? 'darwin' : 'linux';

  return path.resolve(
    'cucumberTests/visual/snapshots',
    `hide-button-chromium-${platform}.png`
  );
}

Given(
  'the user opens the Automation Practice page',
  async function (this: CustomWorld) {
    await requirePages(this).automationPractice.open();
  }
);

Then(
  'the displayed text should be visible',
  async function (this: CustomWorld) {
    await requirePages(this).automationPractice.expectDisplayedTextVisible();
  }
);

Then(
  'the hide button should match its approved visual snapshot',
  async function (this: CustomWorld) {
    const actual =
      await requirePages(this).automationPractice.captureHideButton();

    let expected: Buffer;
    try {
      expected = await readFile(visualBaselinePath());
    } catch {
      await this.attach(actual, 'image/png');
      throw new Error(
        `Visual baseline is missing: ${visualBaselinePath()}`
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
    await requirePages(this).automationPractice.hideDisplayedText();
  }
);

Then(
  'the displayed text should be hidden',
  async function (this: CustomWorld) {
    await requirePages(this).automationPractice.expectDisplayedTextHidden();
  }
);
