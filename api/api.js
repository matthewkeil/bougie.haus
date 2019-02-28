const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression')
const express = require('express');
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);

const api = express();
const db = require('./db');
const passport = require('./passport');
const authRouter = require('./routes/auth.router');
const recipesRouter = require('./routes/recipes.router');
const ingredientsRouter = require('./routes/ingredients.router');

const PROD = process.env.NODE_ENV === 'production';
const SESSION_SECRET = process.env.SESSION_SECRET || 'very_bad-$ession$ecret';

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

api.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

api.use(passport.initialize());
api.use(passport.session());

if (PROD) {
    api.use(compression());    
} else {
  const bodyParser = require('body-parser');
  api.use(bodyParser.json());
  api.use(bodyParser.urlencoded({ extended: false }))
}

api.use('/auth', authRouter);
api.use('/recipes', recipesRouter);
api.use('/ingredients', ingredientsRouter);

api.use((err, req, res, next) => {
  console.error(`>>>> error handler\n\n${err}\n\n>>>> error handler`);
  return res.json({error: err.message})
})

module.exports = api;