const mongoose = require('mongoose');

const {urlSafe} = require('../helpers');

const ingredientSchema = require('./Ingredient').schema;

const stepSchema = new mongoose.Schema({
    process: String,
    ingredients: [mongoose.Schema.Types.ObjectId],
    until: String
    // qty: Number,
    // qtyLabel: {
    //     type: String,
    //     enum: ['tsp', 'tbsp', 'fl_oz', 'cup', 'pint', 'quart', 'gallon', 'ml', 'l', 'g', 'oz', 'lb']
    // },
});

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    urlName: {
        type: String,
        unique: true
    },
    slug: String,
    description: String,
    image: {
        url: String,
        title: String,
        alt: String
    },
    ingredients: [ingredientSchema],
    steps: [stepSchema]
});

recipeSchema.pre("save", async function(next) {
  try {
    const recipe = this;

    if (recipe.isModified("name")) {
        recipe.urlName = urlSafe(recipe.name);
    }

    next();
  } catch (err) {
    console.log(err);
  }
});

// recipeSchema.virtual('urlName').get(function() {
//     return urlSafe(this.name)
// });

exports.schema = recipeSchema;
exports.model = mongoose.model('Recipe', recipeSchema);