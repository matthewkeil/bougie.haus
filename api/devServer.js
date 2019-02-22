require('dotenv').config();

const morgan = require('morgan');
const api = require('./api');

const HOST = process.env.HOST || "bougie.haus";
const API_PORT = process.env.API_PORT || 80;

api.use(morgan('dev'));

api.listen(API_PORT, () => {
    console.log(`api listening on http://${HOST}:${API_PORT}`)
});