import mongoose, { Schema } from "mongoose";

const programSchema = new Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  track: { type: Schema.Types.ObjectId, ref: "track" },
  milestones: [
    {
      title: String,
      description: String,
    },
  ],
});

const Program = mongoose.model("program", programSchema);
export default Program;
