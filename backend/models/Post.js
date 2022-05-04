const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    creator: {
      type: Object,
      default: {},
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
