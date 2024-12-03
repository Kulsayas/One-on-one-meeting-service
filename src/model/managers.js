import mongoose from "mongoose";

//ติดต่อของที่อยู่กับ database
const managerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  position: { type: String, required: true },
  name: { type: String, required: true },
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      default: {},
    },
  ],
});

export default managerModel = mongoose.model("managers", managerSchema);
