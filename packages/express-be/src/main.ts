import express from 'express';
import * as path from 'path';
import cors from 'cors';
import scrapeTop1001Albums from './modules/scrapeTop1001Albums';
const app = express();
const artistsAndAlbumsMerged = [];
const port = process.env.PORT || 3333;

app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send(artistsAndAlbumsMerged);
});

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

(async () => {
  await scrapeTop1001Albums();
})();
