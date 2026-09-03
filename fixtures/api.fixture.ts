import { test as base } from './page.fixture';
import { ApiUtils } from '../utils/ApiUtils';
import { environment } from '../config/environment';

interface ApiFixtures {
  api: ApiUtils;
  authToken: string;
}

export const test = base.extend<ApiFixtures>({
  api: async ({ playwright }, use) => {
    const apiContext = await playwright.request.newContext({
      baseURL: environment.apiBaseUrl
    });
    const api = new ApiUtils(apiContext, {
      userEmail: environment.email,
      userPassword: environment.password
    });

    try {
      await use(api);
    } finally {
      await apiContext.dispose();
    }
  },

  authToken: async ({ api }, use) => {
    await use(await api.getToken());
  }
});

export { expect } from '@playwright/test';
