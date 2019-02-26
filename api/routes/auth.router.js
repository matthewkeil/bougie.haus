const passport = require("../passport");
const Router = require("express").Router;
const authRouter = Router();

const handlePassportResponse = (req, res, next) => (err, user, info) => {
  if (err instanceof Error) {
    return next(err);
  }

  if (user) {
    return res.redirect('http://localhost:3000');
    // return res.json({
    //   message: "successfully logged in",
    //   token: user.token
    // });
  }

  if (!!info && info.message) {
    return res.json({
      error: {
        message: info.message
      }
    });
  }

  return next(new Error("unknown auth error"));
};

authRouter.post("/login", async (req, res, next) => {
  passport.authenticate("local", handlePassportResponse(req, res, next))(
    req,
    res,
    next
  );
});

authRouter.post("/register", async (req, res, next) => {
  passport.authenticate("register", handlePassportResponse(req, res, next))(
    req,
    res,
    next
  );
});

authRouter.get(
  "/login/google",
  passport.authenticate("google", {
    scope: ["email", "profile", "openid"],
  })
);

authRouter.get("/login/google/callback", async (req, res, next) => {
  passport.authenticate("google", handlePassportResponse(req, res, next))(
    req,
    res,
    next
  );
});

authRouter.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = authRouter;
