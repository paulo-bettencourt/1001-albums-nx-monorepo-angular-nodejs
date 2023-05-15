const puppeteer = require('puppeteer');

module.exports = async function scrapeTop1001Albums() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(
    'https://rateyourmusic.com/list/rtfm/1001_albums_you_must_hear_before_you_die___chronological/'
  );

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });
  const ARTISTS_NAME = 'h2';
  const ALBUMS_NAME = 'h3';
  const PAGINATOR = 'navlinknum';

  // Webscrapper gets artists
  const artistsWithNumbers = await page.$$(ARTISTS_NAME); // select all <h2> tags
  const artists = [];
  for (let i = 0; i < artistsWithNumbers.length && i < 100; i++) {
    const album = artistsWithNumbers[i];
    const text = await album.evaluate((node) =>
      node.textContent
        .trim()
        .replace(/^\d+\./, '')
        .trim()
    );
    artists.push(text);
  }

  // Webscrapper gets albums
  const albumsWithoutTrim = await page.$$(ALBUMS_NAME); // select all <h3> tags
  const albums = [];

  for (let i = 0; i < albumsWithoutTrim.length && i < 100; i++) {
    const album = albumsWithoutTrim[i];
    const text = await album.evaluate((node) =>
      node.textContent.trim().replace(/\s+/g, ' ')
    );
    albums.push(text);
  }

  // Creation of Record object (number of record + artist + album)
  const artistsAndAlbumsMerged = [];
  for (let i = 1; i < artists.length + 1 && i < 101; i++) {
    const mergedArtistAndAlbum = {
      number: i,
      artist: artists[i - 1],
      album: albums[i - 1],
    };
    artistsAndAlbumsMerged.push(mergedArtistAndAlbum);
  }

  // Loop through the merged array and log the contents
  for (const { number, artist, album } of artistsAndAlbumsMerged) {
    console.log(`number: ${number}, artist: ${artist}, album: ${album}`);
  }

  // Click on Paginator and go to next page

  await browser.close();
};
