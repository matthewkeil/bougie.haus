const mongoose = require('mongoose');


const ingredientSchema = new mongoose.Schema({
    name: String,
    qty: Number,
    qtyLabel: {
        type: String,
        enum: ['tsp', 'tbsp', 'fl_oz', 'cup', 'pint', 'quart', 'gallon', 'ml', 'l', 'g', 'oz', 'lb']
    }
});

const recipeSchema = new mongoose.Schema({
    name: String,
    urlName: {
        type: String,
        default: function() { return this.name.toLowerCase().replace(' ', '-'); }
    },
    slug: String,
    description: String,
    image: {
        url: String,
        title: String
    },
    ingredients: [ingredientSchema],
    directions: [String]
});


module.exports = mongoose.model('Recipe', recipeSchema);