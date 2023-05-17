// Imports
import express from 'express';
import * as path from 'path';
import cors from 'cors';

// Modules
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webscrapper = require('./modules/scrapeTop1001Albums');

// Variables
const app = express();
const port = process.env.PORT || 3333;

// Server setup
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', webscrapper.scrapeTop1001Albums);

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
