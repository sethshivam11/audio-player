import mongoose, { Schema } from "mongoose";

const trackSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  image: String,
  duration: Number,
});

const Track = mongoose.model("track", trackSchema);
export default Track;
