// import express from 'express';
// import compression from 'compression';
// import path from 'path';
// import template from './template';
//
// const clientAssets = require(KYT.ASSETS_MANIFEST); // eslint-disable-line import/no-dynamic-require
// const port = parseInt(KYT.SERVER_PORT, 10);
// const app = express();
//
// // Remove annoying Express header addition.
// app.disable('x-powered-by');
//
// // Compress (gzip) assets in production.
// app.use(compression());
//
// // Setup the public directory so that we can server static assets.
// app.use(express.static(path.join(process.cwd(), KYT.PUBLIC_DIR)));
//
// // Setup server side routing.
// app.get('*', (request, response) => {
//   'use strict';
//   response.status(200).send(template({
//     root: 'root',
//     jsBundle: clientAssets.main.js,
//     commonsBundle: clientAssets.commons.js,
//     cssBundle: clientAssets.main.css,
//   }));
//
// });
//
// app.listen(port, () => {
//   console.log(`server started on port: ${port}`); // eslint-disable-line no-console
// });

/* eslint-disable prefer-template */

const path = require('path');
const express = require('express');
const clientAssets = require(KYT.ASSETS_MANIFEST);

const app = express();

app.use(express.static(path.join(process.cwd(), KYT.PUBLIC_DIR)));

app.get('/', (req, res) => {
  res.send(`
    <head>
      <link rel="shortcut icon" href='/kyt-favicon.png'>
      ${clientAssets.main.css ?
  '<link rel="stylesheet" type="text/css" href="' + clientAssets.main.css + '">'
    : ''}
      <title>React kyt</title>
    </head>
    <body>
      <div id='root'></div>
      <script src='${clientAssets.commons.js}'></script>
      <script src='${clientAssets.main.js}'></script>
    </body>
  `);
});

app.listen(parseInt(KYT.SERVER_PORT, 10));
