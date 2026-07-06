import mongoose, { Schema, models, model } from "mongoose";

const AuthorSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    linkedin: { type: String, required: true },
    designation: { type: String, required: true },
    description: { type: String, default: "" },
    about: { type: String, default: "" },
    imageSmall: { type: String, default: "" }, // blog page image
    imageBig: { type: String, default: "" }, // detail page image
  },
  { timestamps: true },
);

const Author = models.Author || model("Author", AuthorSchema);

export default Author;