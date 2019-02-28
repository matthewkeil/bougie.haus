const router = require("express").Router();

const {Ingredient} = require('../models');


router.use('/new', async (req, res) => {
    const {name, wiki, varieties} = req.body

    let result = await Ingredient.findOne({name});

    if (!!result) return res.status(403).json({message: `${name} already exists at bougie.haus`});

    const ingredient = new Ingredient({name, wiki, varieties});

    result = await ingredient.save()

    res.json(result);
})

module.exports = router;