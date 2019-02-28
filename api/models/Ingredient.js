const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  pageid: String,
  wiki: {
    titles: {
      display: String,
      canonical: String
    },
    thumbnail: {
      source: String,
      width: Number,
      Height: Number
    },
    originalimage: {
      source: String,
      width: Number,
      Height: Number
    }
  }
  // parts: {
  //     type: [String],
  //     default: function () { return ['whole'] }
  // },
  // preservation: String
});

ingredientSchema.virtual("name", function() {
  return this.wiki.titles.canonical;
});

exports.schema = ingredientSchema;
exports.model = mongoose.model("Ingredient", ingredientSchema);
