const puppeteer = require('puppeteer');

async function scrapeTop1001Albums(req, res) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const artistsAndAlbums = [];

  await page.goto('http://localhost:4201/');

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // Webscrapper gets artists
  const artists = await page.evaluate(() => {
    const rows = document.querySelectorAll('tr'); // Select all <tr> elements
    const secondTdsArray = Array.from(rows).map((row) => {
      const tds = row.querySelectorAll('td'); // Select all <td> elements within the current <tr>
      return tds[1].textContent; // Get the content of the second <td> element within the current <tr>
    });
    return secondTdsArray;
  });

  // Webscrapper gets albums
  const albums = await page.evaluate(() => {
    const rows = document.querySelectorAll('tr');
    const secondTdsArray = Array.from(rows).map((row) => {
      const tds = row.querySelectorAll('td');
      return tds[2].textContent;
    });
    return secondTdsArray;
  });

  for (var i = 0; i < albums.length; i++) {
    artistsAndAlbums.push({
      number: i + 1,
      artist: artists[i],
      album: albums[i],
      isSelected: false,
    });
  }

  await browser.close();

  res.send(artistsAndAlbums);
}

module.exports = {
  scrapeTop1001Albums,
};
