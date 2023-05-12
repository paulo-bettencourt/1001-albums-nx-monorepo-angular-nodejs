/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to express-be!' });
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

  const artists = await page.$$('h2'); // select all <h2> tags
  const albumsWithoutTrim = await page.$$('h3'); // select all <h3> tags
  const albums = [];

  for (let i = 0; i < albumsWithoutTrim.length && i < 100; i++) {
    const album = albumsWithoutTrim[i];
    const text = await album.evaluate((node) =>
      node.textContent.trim().replace(/\s+/g, ' ')
    );
    albums.push(text);
  }

  const artistsAndAlbumsMerged = [];
  for (let i = 0; i < artists.length && i < 100; i++) {
    const mergedArtistAndAlbum = { artist: artists[i], album: albums[i] };
    artistsAndAlbumsMerged.push(mergedArtistAndAlbum);
  }

  // Loop through the merged array and log the contents
  for (const { artist, album } of artistsAndAlbumsMerged) {
    const artistText = await artist.evaluate((node) => node.textContent);
    const albumText = album; // no need to evaluate the album text here
    console.log(`artist: ${artistText}, album: ${albumText}`);
  }

  await browser.close();
})();
