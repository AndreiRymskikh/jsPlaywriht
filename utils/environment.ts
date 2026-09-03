import 'dotenv/config';

function getRequiredEnvironmentVariable(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Missing required environment variable ${name}. Copy .env.example to .env and provide a value.`
    );
  }

  return value;
}

export const environment = {
  baseUrl: process.env.BASE_URL ?? 'https://rahulshettyacademy.com/client/',
  apiBaseUrl: process.env.API_BASE_URL ?? 'https://rahulshettyacademy.com',
  get email(): string {
    return getRequiredEnvironmentVariable('USER_EMAIL');
  },
  get password(): string {
    return getRequiredEnvironmentVariable('USER_PASSWORD');
  }
};
