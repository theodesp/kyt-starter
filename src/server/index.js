import express from 'express';
import compression from 'compression';
import path from 'path';
import template from './template';

const clientAssets = require(KYT.ASSETS_MANIFEST); // eslint-disable-line import/no-dynamic-require
const port = parseInt(KYT.SERVER_PORT, 10);
const app = express();

// Remove annoying Express header addition.
app.disable('x-powered-by');

// Compress (gzip) assets in production.
app.use(compression());

// Setup the public directory so that we can server static assets.
app.use(express.static(path.join(process.cwd(), KYT.PUBLIC_DIR)));

// Setup server side routing.
app.get('*', (request, response) => {
  'use strict';
  response.status(200).send(template({
    root: 'root',
    jsBundle: clientAssets.main.js,
    commonsBundle: clientAssets.commons.js,
    cssBundle: clientAssets.main.css,
  }));

});

app.listen(port, () => {
  console.log(`server started on port: ${port}`); // eslint-disable-line no-console
});
