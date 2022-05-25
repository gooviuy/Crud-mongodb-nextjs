import mongoose from "mongoose";
const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
  plot: {
    type: String,
    required: [true, "Please add a description"],
  },
});

export default mongoose.models.Movie || mongoose.model("Movie", MovieSchema);
