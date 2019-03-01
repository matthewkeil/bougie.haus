const router = require("express").Router();

const { makeCanonical } = require("../helpers");
const { Ingredient } = require("../models");

router.get("/", (req, res, next) => {
  Ingredient.find({}).then(
    result => {
      if (result) return res.json(result);
      res.status(500).json({ message: `we couldn't find any ingedients?!?!` });
    },
    err => next(err)
  );
});

router.use("/new", async (req, res, next) => {
  if (!(req.body && req.body.titles))
    return res.status(400).json({ message: `bad or no info sent` });

  const { display, canonical } = req.body.titles;

  let result = await Ingredient.findOne({ canonical });

  if (!!result)
    return res
      .status(403)
      .json({ message: `${display} already exists at bougie.haus` });

  const ingredient = new Ingredient({
    pageid: req.body.pageid,
    wiki: req.body
  });

  try {
    result = await ingredient.save();
  } catch (err) {
    next(err);
  }

  res.json(result);
});

router
  .route("/:canonical")
  .get((req, res, next) => {
    const canonical = req.params.canonical;
    Ingredient.findOne({ canonical }).then(
      result => {
        if (result) return res.json(result);
        res.status(404).json({
          message: `please add ${makeCanonical(canonical)} to bougie.haus`
        });
      },
      err => next(err)
    );
  })
  .patch(async (req, res, next) => {
    const { canonical } = req.params;
    const {extract} = req.body;
    Ingredient.findOneAndUpdate({ canonical }, { ["wiki.extract"]: extract }).then(
      result => {
        res.status(200).json({ message: `${result.wiki.titles.display} updated` });
      },
      err => next(err)
  );
  })
  .delete(async (req, res, next) => {
    const canonical = req.params.canonical;
    Ingredient.findOneAndDelete({ canonical }).then(
      ingredient =>
        res
          .status(200)
          .json({ message: `${ingredient.wiki.titles.display} deleted` }),
      err => next(err)
    );
  });

module.exports = router;
