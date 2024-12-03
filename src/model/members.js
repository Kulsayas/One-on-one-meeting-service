import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  position: { type: String, required: true },
  name: { type: String, required: true },
  manager: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "managers",
      required: true,
    },
  ],
});

export default memberModel = mongoose.model("members", memberSchema);
