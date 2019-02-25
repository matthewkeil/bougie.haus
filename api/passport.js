const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/User");

const HOST = process.env.HOST;
const PORT = process.env.API_PORT ? `:${process.env.API_PORT}` : "";
const API = HOST + PORT;

/**
 *
 * serialize and deserialize user from a session
 * using express-sessions
 *
 */
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

/**
 *
 *
 * jwt Strategy for api endpoints
 *
 *
 */
const JWT_SECRET = process.env.JWT_SECRET || "very_bad-JTW=$ecret";
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET
};

passport.use(
  new JwtStrategy(jwtOptions, function(token, done) {
    User.findById(token._id, (err, user) => {
      if (err) done(err);
      if (user) return done(null, user);
    });
  })
);

/**
 *
 *
 * local login
 *
 *
 */
passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "incorrect email or password" });
        }

        if (await user.validatePassword(password)) {
          if (user.hasValidToken()) {
            return done(null, user);
          }

          await user.updateToken();

          return done(null, user);
        }

        return done(null, false, { message: "incorrect email or password" });
      } catch (err) {
        done(err);
      }
    }
  )
);

/**
 *
 *
 * local register
 *
 *
 */
passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      try {
        let user = await User.findOne({ email });

        if (user) {
          return done(null, false, { message: "email already in use" });
        }

        user = await new User({ email, password });

        await user.updateToken();

        await user.save();

        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

/**
 *
 *
 *  google oAuth2
 *
 *
 */
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `http://${API}/auth/login/google/callback`
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(accessToken, refreshToken, profile);
      return done(null, profile);
    }
  )
);

module.exports = passport;
