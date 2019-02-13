const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression')

const db = require('./db')
const router = require('./router');

const PROD = process.env.NODE_ENV === 'production';

const api = express();

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
}

api.use('*', async (_, res, next) => {
  await db(res);
  next();
});

module.exports = api;