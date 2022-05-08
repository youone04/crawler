const puppeteer = require("puppeteer");

exports.scraperData = async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.goal.com/id/berita/1");
    const [el] = await page.$x(
      "/html/body/div[3]/div[2]/div[2]/div/section/h2[1]"
    );
    const tgl = await el.getProperty("textContent");
    const tglText = await tgl.jsonValue();

    const [el2] = await page.$x(
      "/html/body/div[3]/div[2]/div[2]/div/section/div[1]/article[1]/a/div[2]/h3"
    );
    const title = await await el2.getProperty("textContent");
    const titleText = await title.jsonValue();

    const [el3] = await page.$x(
      "/html/body/div[3]/div[2]/div[2]/div/section/div[1]/article[1]/footer/time"
    );
    const date = await await el3.getProperty("textContent");
    const timeText = await date.jsonValue();

    const [el4] = await page.$x(
      "/html/body/div[3]/div[2]/div[2]/div/section/div[1]/article[1]/footer/a"
    );
    const sumber = await await el4.getProperty("textContent");
    const sumberText = await sumber.jsonValue();

    const [el5] = await page.$x(
      "/html/body/div[3]/div[2]/div[2]/div/section/div[1]/article[1]/a/div[1]/img"
    );
    const gambar = await await el5.getProperty("srcset");
    //  srcset
    const gambarText = await gambar.jsonValue();

    const data = {
      tglText,
      titleText,
      timeText,
      sumberText,
      gambarText,
    };
    res.status(200).send({
      status: 200,
      message: "Success",
      data: data,
    });
    await browser.close();
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Failed",
      error: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

exports.scraperDataAll = async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.goal.com/id/berita/1");

    const elHandleArray = await page.$$(".picture__image");
    const title = await page.$$(".title h3");
    const sumberArray = await page.$$(".category"); 
    const time = await page.$$("time");   
    

    var dataScrape = [];
    for (let i=0;i<title.length; i++) {
    const gambar = await elHandleArray[i].getProperty("srcset");
    const judul = await title[i].getProperty("textContent");
    const sumber = await sumberArray[i].getProperty("textContent");
    const waktu = await time[i].getProperty('textContent');
    dataScrape.push({judul: judul._remoteObject.value , gambar:gambar._remoteObject.value,sumber: sumber._remoteObject.value,waktu: waktu._remoteObject.value })
    }

    res.status(200).send({
      status: 200,
      message: "Success",
      data: dataScrape,
    });
    await browser.close();
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Failed",
      error: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
