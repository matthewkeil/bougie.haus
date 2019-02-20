const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression')
const express = require('express');

const api = express();
const db = require('./db')
const router = require('./router');

const PROD = process.env.NODE_ENV === 'production';

api.use(helmet());
api.options('*', cors());
api.use(cors({
    origin: PROD ? /https.*bougie\.haus$/ : /localhost/,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
    allowHeaders: [
      "Authorization",
      "Accept",
      "Content-Type",
      "DNT",
      "Viewport-Width",
      "Width"
    ]
}));

if (PROD) {
    api.use(compression());    
} else {
  const bodyParser = require('body-parser');
  api.use(bodyParser.json());
  api.use(bodyParser.urlencoded({ extended: false }))
}

api.use('*', async (req, res, next) => {
  await db(res);
  next();
});

api.use(router);

module.exports = api;