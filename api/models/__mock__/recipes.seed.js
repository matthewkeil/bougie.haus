

const db = require('../../db');

db.dropCollection('recipes', (err, res) => {
    if (err) console.err(err)
    console.log(res);
});