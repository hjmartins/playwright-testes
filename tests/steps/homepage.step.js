const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { firefox } = require('playwright');
const { expect } = require('@playwright/test');

setDefaultTimeout(30 * 1000);

let browser, context, page, newPage;

Given('que estou na página de login', async function () {
  browser = await firefox.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto('http://localhost/e-cidade/login.php');
});

When('preencho o login e a senha', async function () {
  await page.fill('#usu_login', 'dbseller');
  // Se tiver senha, preencha também aqui, ex:
  // await page.fill('#senha', 'suaSenha');
});

When('clico no botão de login', async function () {
  // Clica no login
  await page.click('#btnlogar');

  // Abre nova página diretamente, já que sabe a URL
  newPage = await context.newPage();
  await newPage.goto('http://localhost/e-cidade/extension/desktop/');
  await newPage.waitForLoadState('load');

  console.log('Nova página carregada:', newPage.url());
});

Then('vejo o conteúdo na nova janela', async function () {
    console.log(newPage.url())
  //await newPage.click('.taskbar-menu-button');
    await newPage.waitForSelector('.taskbar-menu-button', { timeout: 15000 });
  const menuText = await newPage.textContent('.taskbar-menu-button');
  console.log('Texto do menu:', menuText);

  expect(menuText).toBe('MENU'); // ou o texto que espera

  await browser.close();
});
