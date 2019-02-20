const passport = require("./passport");
const Router = require("express").Router;
const userRouter = Router();

const handlePassportResponse = (req, res, next) => (err, user, info) => {

  if (err instanceof Error) {
    return next(err);
  }

  if (user) {
    return res.json({
      message: "successfully logged in",
      token: user.token
    });
  }

  if (!!info && info.message) {
    return res.json({
      error: {
        message: info.message
      }
    });
  }

  return next(new Error('unknown auth error'))
};

userRouter.post("/login", async (req, res, next) => {
  passport.authenticate("local", handlePassportResponse(req, res, next))(
    req,
    res,
    next
  );
});

userRouter.post("/register", async (req, res, next) => {
  passport.authenticate("register", handlePassportResponse(req, res, next))(
    req,
    res,
    next
  );
});

// userRouter.get(
//   "/users/login/google",
//   passport.authenticate("google", {
//     scope: [
//       "https://www.googleapis.com/auth/userinfo.email",
//       "https://www.googleapis.com/auth/userinfo.profile"
//     ]
//   })
// );

// userRouter.get(
//   "/users/login/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//     failureFlash: true
//   })
// );

module.exports = userRouter;
