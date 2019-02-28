const router = require("express").Router();

const {Ingredient} = require('../models');


router.use('/new', async (req, res, next) => {
    
    const {display, canonical} = req.body.titles
    
    let result = await Ingredient.findOne({canonical});
    
    if (!!result) return res.status(403).json({message: `${display} already exists at bougie.haus`});

    const ingredient = new Ingredient({pageid: req.body.pageid, wiki: req.body});

    try {
        result = await ingredient.save()
    } catch (err) { next(err) }

    res.json(result);
})

router.route('/:canonical')
    .get(async (req, res) => {
        const canonical = req.params.canonical;
        let result;
        try {
            result = await Ingredient.findOne({canonical});
        } catch (err) { return res.status(404).json({message: "please add that to bougie.haus"})}
        res.json(result);
    })
    .patch(async (req, res) => {})
    .delete(async (req, res) => {})


module.exports = router;