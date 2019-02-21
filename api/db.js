const mongoose = require("mongoose");

const username = process.env.MONGO_USERNAME || "DevServer";
const password = process.env.MONGO_PASSWORD || "BougieHaus1!";
const host = process.env.MONGO_HOST || "ds251588.mlab.com";
const port = process.env.MONGO_PORT || 51588;
const dbName = process.env.MONGO_DBNAME || "dev-bougie-haus";

const uri = `mongodb://${username}:${password}@${host}:${port}/${dbName}`;

mongoose.connection.on("error", err =>
  console.error("connection error: " + err)
);

mongoose.connection.on("open", () =>
  console.error(`connected to mongodb://${host}:${port}/${dbName}`)
);

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true
});

module.exports = mongoose.connection;
