const mongoose = require('mongoose');

const {urlSafe} = require('./helpers');

const ingredientSchema = require('./Ingredient').schema;

const stepSchema = new mongoose.Schema({
    process: String,
    ingredients: [mongoose.Schema.Types.ObjectId],
    until: String
});

const recipeSchema = new mongoose.Schema({
    name: String,
    urlName: {
        type: String,
        unique: true,
        default: function() { return urlSafe(this.name); }
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

    // qty: Number,
    // qtyLabel: {
    //     type: String,
    //     enum: ['tsp', 'tbsp', 'fl_oz', 'cup', 'pint', 'quart', 'gallon', 'ml', 'l', 'g', 'oz', 'lb']
    // },
});

exports.schema = recipeSchema;
exports.model = mongoose.model('Recipe', recipeSchema);