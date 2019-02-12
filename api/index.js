const db = require('./db');
const morgan = require('morgan');
const api = require('./api');
const PORT = 4000;

console.log(db())

api.use(morgan('dev'));
api.listen(PORT, () => {
    console.log('api listening on http://localhost:' + PORT)
});