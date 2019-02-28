const router = require("express").Router();

const {Ingredient} = require('../models');


router.use('/new', async (req, res) => {
    
    const { pageid, titles: {display} } = req.body
    
    let result = await Ingredient.findOne({pageid});
    
    if (!!result) return res.status(403).json({message: `${display} already exists at bougie.haus`});

    const ingredient = new Ingredient({pageid, wiki: req.body});

    result = await ingredient.save()

    res.json(result);
})

router.route('/:canonical')
    .get(async (req, res, next) => {})
    .patch(async (req, res, next) => {})
    .delete(async (req, res, next) => {})


module.exports = router;