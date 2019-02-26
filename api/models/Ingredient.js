const mongoose = require('mongoose');

const {urlSafe} = require('./helpers');

const ingredientSchema = new mongoose.Schema({
    name: {
        simple: String,
        common: String,
        aliases: [String]
    },
    urlName: {
        type: String,
        unique: true,
        default: function() { return urlSafe(this.name.common) }
    },
    variety: String,
    portion: {
        type: [String],
        default: function () { return ['whole'] }
    },
    preservation: String
});

exports.schema = ingredientSchema;
exports.model = mongoose.model('Ingredient', ingredientSchema);
