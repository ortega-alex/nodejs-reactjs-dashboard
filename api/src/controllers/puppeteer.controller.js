import puppeteer from 'puppeteer';
import path from 'path';

export async function screenshot(req, res) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const ruta = path.join(__dirname, '../public/puppeteer/');
    await page.goto('https://example.com');
    await page.screenshot({ path: ruta + 'example.png' });
    const html = await page.content();

    await browser.close();
    return res.status(200).json({
        message: 'success',
        html
    });
}