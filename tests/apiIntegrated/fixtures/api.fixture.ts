import { test as base } from '@playwright/test';
import { POManager } from '../../../pages/POManager';
import { ApiUtils } from '../../../utils/ApiUtils';
import { environment } from '../../../utils/environment';

interface ApiIntegratedFixtures {
  api: ApiUtils;
  app: POManager;
  authToken: string;
}

export const test = base.extend<ApiIntegratedFixtures>({
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

  app: async ({ page }, use) => {
    await use(new POManager(page));
  },

  authToken: async ({ api }, use) => {
    await use(await api.getToken());
  }
});
