const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { firefox } = require('playwright');
const { expect } = require('@playwright/test');

let browser, context, page, newPage;
setDefaultTimeout(30 * 1000);
Given('que estou na página de login', async function () {
  browser = await firefox.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto('http://localhost/e-cidade/login.php');
});

When('preencho o login e a senha', async function () {
  await page.fill('#usu_login', 'dbseller');
  
});

When('clico no botão de login', async function () {
  [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click('#btnlogar')
  ]);
  await newPage.waitForLoadState();
});

Then('vejo o conteúdo na nova janela', async function () {
  const content = await newPage.textContent('body');
  expect(content).toContain('Texto esperado');
  await browser.close();
});
