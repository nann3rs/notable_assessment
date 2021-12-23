const puppeteer = require("puppeteer");


(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = (await browser.pages())[0];

  await page.goto("https://data.gov");

  await page.type("#search-header", "health");

  await Promise.all([page.click(".search-form button"), page.waitForNavigation()]);

  const data = [];


  // const test = await page.$eval(".dataset-content", (data) => data.textContent);

  // const pages = await page.$eval(".pagination", (list) => {
  //   list[0].childElementCount;
  // })
  // console.log(pages);

  const orgs = await page.$$eval(".dataset-content", (data) => {
    let allOrgs = [];
    data.map(allInfo => {
      let info = {
        Organization: allInfo.children[0].innerText,
        Data_Set: allInfo.children[1].innerText
      };

      let format = allInfo.children[3];
      if (format !== undefined) {
        info['Data_Format'] = allInfo.children[3].innerText;
      }
      allOrgs.push(info);
    })
    return allOrgs;
  })

  console.log(orgs);



  await browser.close();
})();
