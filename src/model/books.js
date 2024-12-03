import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  time_slot: { type: String, required: true, unique: true },
  duration: { type: Number, required: true },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: null },
  is_delete: { type: Boolean, required: false },
  member: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "member",
      required: true,
    },
  ],
});
const bookModel = mongoose.model("book", bookSchema);
export default bookModel;
