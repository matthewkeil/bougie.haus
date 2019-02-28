const mongoose = require("mongoose");
const canonical = require("../helpers").canonical;

const ingredientSchema = new mongoose.Schema({
  pageid: String,
  wiki: {
    titles: {
      display: String,
      canonical: {
        type: String,
        require: true
      }
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
    },
    extract: String
  },
  canonical: {
    type: String,
    set: function(value) {
      if (this.wiki && this.wiki.titles && this.wiki.titles.canonical !== value) {
        throw new Error(`cannot manually set canonical`);
      }
      return value;
    }
  }
});

ingredientSchema.pre("save", async function(next) {
  try {
    const ingredient = this;

    if (ingredient.isModified("wiki.titles.canonical")) {
      ingredient.canonical = canonical(ingredient.wiki.titles.canonical);
    }

    next();
  } catch (err) {
    console.log(err);
  }
});

exports.schema = ingredientSchema;
exports.model = mongoose.model("Ingredient", ingredientSchema);
