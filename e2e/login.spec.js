
const { test, expect } = require('@playwright/test');

test('connexion réussie avec les bons identifiants', async ({ page }) => {
  await page.goto('http://localhost:3000/login.html');

  await page.fill('#email', 'admin@test.fr');
  await page.fill('#password', '123456');
  await page.click('button[type="submit"]');

  await expect(page.locator('#message')).toHaveText('Connexion réussie');
});

test('connexion refusée avec un mauvais mot de passe', async ({ page }) => {
  await page.goto('http://localhost:3000/login.html');

  await page.fill('#email', 'admin@test.fr');
  await page.fill('#password', 'wrong');
  await page.click('button[type="submit"]');

  await expect(page.locator('#message')).toHaveText('Identifiants incorrects');
});
