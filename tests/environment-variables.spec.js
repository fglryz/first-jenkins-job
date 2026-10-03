import { expect, test } from '@playwright/test';

test('@env-test Testing environment variables', async () => {
  expect(process.env.PRACTICE_USERNAME).toBeTruthy();
  expect(process.env.PRACTICE_PASSWORD).toBeTruthy();
  console.log('PRACTICE_USERNAME:', process.env.PRACTICE_USERNAME);
  console.log('PRACTICE_PASSWORD:', process.env.PRACTICE_PASSWORD);
});

test('Bypass authentication by encoding credentials in base64 format', async ({
  page,
}) => {
  const username = process.env.PRACTICE_USERNAME;
  const password = process.env.PRACTICE_PASSWORD;
  test.skip(!username || !password, 'Practice credentials are not configured');

  const encodedCredentials = Buffer.from(`${username}:${password}`).toString(
    'base64',
  );

  await page.setExtraHTTPHeaders({
    Authorization: `Basic ${encodedCredentials}`,
  });

  await page.goto('https://the-internet-5chk.onrender.com/basic_auth');
});
