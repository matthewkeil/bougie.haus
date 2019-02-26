
const router = require("express").Router();

const {Recipe} = require('../models');

const mock = require('../models/__mock__/recipe.mock')

const handle = (fn) => async (req, res, next) => {
    try {
        await fn(req, res);
        next();
    } catch (err) { next(err) }
}

router.route('/:urlName')
    .get(handle(async (req, res) => {
        const [result] = await Recipe.find({urlName: req.params.urlName})
        res.json(mock);
    }))
    .post(async (req, res) => {
        console.log(req.body);
        const [result] = await Recipe.find({urlName: req.params.urlName})
    })
    .patch(async (req, res) => {
        console.log(req.body);
        const [result] = await Recipe.findOneAndUpdate({urlName: req.params.urlName}, {...req.body});
    })
    .delete(async (req, res) => {
        const [result] = await Recipe.findOneAndDelete({urlName: req.params.urlName});
        console.log(result);
    })

module.exports = router;