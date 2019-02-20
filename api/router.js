const Router = require("express").Router;
const bcrypt = require("bcrypt");

const Recipe = require("./models/Recipe");
const User = require("./models/User");

/**
 *  get all recipes
 *  get a specific recipe
 *
 * create a recipe
 * update a recipe
 * delete a recipe
 *
 *
 */

const router = Router();

router.post("/users/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || password === "") {
      return res.json({ error: "invalid email or password" });
    }

    let user = await User.findOne({ email });

    if (user) {
      return res.json({ error: "email already in use" });
    }

    user = new User({ email, password });

    user.save();

    res.json(JSON.parse({ ...user, password: null }));
  } catch (err) {
    console.error(err);
  }
});

router.post("/users/login", async (req, res) => {
  function noGood() {
    res.status(401);
    res.json(JSON.stringify({ error: "email or password is incorrect" }));
    return res.end();
  }

  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) return noGood();

    if (await bcrypt.compare(password, user.password)) {
      delete user.password;
      delete user.token;
      return res.json({ ...user });
    }

    return noGood();
  } catch (err) {
    console.error(err);
  }
});

router
  .route("/recipes")
  .get(async (req, res, next) => {
    const recipes = await Recipe.find();
    res.json(JSON.stringify(recipes));
  })
  .post(async (req, res, next) => {
    console.log(req.body);

    const name = req.body.name;
    const description = req.body.description;
    const slug = !!req.body.slug ? req.body.slug : description.slice(0, 40);

    const recipe = new Recipe({ name, description, slug });

    await recipe.save();
    res.send("<h1>saved</h1>");
  });

router
  .route("/recipes/:name")
  .get(async (req, res, next) => {
    const results = await Recipe.findOne({ recipeUrl: req.params.name });
    console.log(results);
  })
  .patch(async (req, res, next) => {})
  .delete(async (req, res, next) => {});

// .post(async (req, res, next) => {})
// .patch(async (req, res, next) => {})
// .delete(async (req, res, next) => {})

module.exports = router;
