const mongoose = require('mongoose');

const db = mongoose.createConnection(process.env.NODE_ENV === 'development'
    ? 'mongodb://DevServer:BougieHaus1!@ds145289.mlab.com:45289/bougie-haus'
    : process.env.DB_URI);

db.on('error', (err) => console.error('connection error: ' + err));

db.on('open', () => console.log('connected to db at ' + process.env.DB_URI));

module.exports = db;