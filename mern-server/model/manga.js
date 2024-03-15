import mongoose from "mongoose";

const mangaSchema = mongoose.Schema({
  manga_name: {
    type: String,
    required: true,
  },
  manga_link: {
    type: String,
    required: true,
  },
  manga_chapter: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Manga = mongoose.model("manga_coll", mangaSchema);
export default Manga;
