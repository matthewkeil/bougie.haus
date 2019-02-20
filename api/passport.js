const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/User");

const PROD = process.env.NODE_ENV === "production";
const HOST = PROD ? "https://bougie.hous" : "http://localhost:4000";

const JWT_SECRET = process.env.JWT_SECRET || "very_bad-JTW=$ecret";
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
  issuer: HOST,
  audience: HOST
};

passport.use(
  new JwtStrategy(jwtOptions, async function(token, done) {
    try {
      console.log(token);
      const user = await User.findOne({ token });
      if (user) return done(null, user);
    } catch (err) {
      done(err);
    }
  })
);

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "dgfd";
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "dfgdfg";

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: `${HOST}/users/login/google/callback`
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       return done(null, profile);
//     }
//   )
// );

passport.use(
  "login",
  new LocalStrategy(async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false, {message: "incorrect email or password"});
      }

      if (await user.validatePassword(password)) {
        
        if (user.hasValidToken()) {
            return done(null, user);
        }

        await user.updateToken();
        
        return done(null , user);
      }

      return done(null, false, {message: "incorrect email or password"});
    } catch (err) {
      done(err);
    }
  })
);

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        let user = await User.findOne({ email });

        if (user) {
          return done(null, false, {message: "email already in use"});
        }

        user = await new User({ email, password });

        await user.save();

        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

// passport.serializeUser((user, done) => {
//   if (user.token) delete user.token;
//   if (user.tokens) delete user.tokens;
//   if (user.session) delete user.session;
//   if (user.sessions) delete user.sessions;
//   if (user.password) delete user.password;
//   if (user.passwords) delete user.passwords;
//   done(null, user);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });

module.exports = passport;
