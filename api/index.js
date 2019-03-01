require('dotenv').config();

const morgan = require('morgan');
const api = require('./api');

const HOST = process.env.HOST || "bougie.haus";
const PORT = process.env.API_PORT || process.env.PORT;

api.use(morgan('dev'));

api.listen(PORT, () => {
    console.log(`api listening on http://${HOST}:${PORT}`)
});