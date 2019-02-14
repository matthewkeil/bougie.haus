const Router = require('express').Router;

const Recipe = require('./models/Recipe');


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

router.route('/recipes')
    .get(async (req, res, next) => {
        const recipes = await Recipe.find({});
        res.send(`${recipes.length}`);
    })

    router.route('/recipes/new')
        .get(async (req, res, next) => {})
        .post(async (req, res, next) => {
            console.log(req.body);

            const name = req.body.name;
            const description = req.body.description;
            const slug = !!req.body.slug ? req.body.slug : description.slice(0, 40);

            const recipe = new Recipe({name, description, slug});

            await recipe.save();
            res.send('<h1>saved</h1>');
        })

router.route('/recipes/:name')
    .get(async (req, res, next) => {
        const results = await Recipe.findOne({recipeUrl: req.params.name});
        console.log(results);
    })
    .patch(async (req, res, next) => {})
    .delete(async (req, res, next) => {})

    // .post(async (req, res, next) => {})
    // .patch(async (req, res, next) => {})
    // .delete(async (req, res, next) => {})

module.exports = router;