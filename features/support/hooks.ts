import { After, Before, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from './world';

setDefaultTimeout(30_000);

Before(async function (this: CustomWorld) {
  await this.start();
});

After(async function (this: CustomWorld) {
  await this.stop();
});
