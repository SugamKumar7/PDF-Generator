const fs = require('fs')
const path = require('path')
const utils = require('util')
const puppeteer = require('puppeteer')
const hb = require('handlebars')
const readFile = utils.promisify(fs.readFile)
const express = require("express");
var app = express();
app.use(express.static(__dirname + '/public'));  

async function getTemplateHtml() {

    console.log("Loading template file in memory")
    try {
        const invoicePath = path.resolve("./index.html");
        return await readFile(invoicePath, 'utf8');
    } catch (err) {
        return Promise.reject("Could not load html template");
    }
}


async function generatePdf() {

    let data = {};

    getTemplateHtml()
        .then(async (res) => {
            // console.log(res)

            console.log("Compiing the template with handlebars")
            const template = hb.compile(res, { strict: true });
            
            const result = template(data);
            // send data
            const html = result;

            const browser = await puppeteer.launch();
            const page = await browser.newPage()

            await page.setContent(html)

            await page.pdf({ path: 'invoice.pdf', format: 'A4' })

            await browser.close();
            console.log("PDF Generated")

        })
        .catch(err => {
            console.error(err)
        });
}

generatePdf();