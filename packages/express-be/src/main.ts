/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';

const app = express();
const artistsAndAlbumsMerged = [];
import cors from 'cors';

app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send(artistsAndAlbumsMerged);
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(
    'https://rateyourmusic.com/list/rtfm/1001_albums_you_must_hear_before_you_die___chronological/'
  );

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // Webscrapper gets artists
  const artistsWithNumbers = await page.$$('h2'); // select all <h2> tags
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
  const albumsWithoutTrim = await page.$$('h3'); // select all <h3> tags
  const albums = [];

  for (let i = 0; i < albumsWithoutTrim.length && i < 100; i++) {
    const album = albumsWithoutTrim[i];
    const text = await album.evaluate((node) =>
      node.textContent.trim().replace(/\s+/g, ' ')
    );
    albums.push(text);
  }

  // Creation of Record object (number of record + artist + album)
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

  await browser.close();
})();
