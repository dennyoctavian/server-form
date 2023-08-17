import mongoose from "mongoose";
const { Schema } = mongoose;

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      require: true,
      minLength: ["3", "Nama Panjang minimal 3 karakter"],
    },
    email: {
      type: String,
      require: true,
      unique: true,
      validate: [validateEmail, "Email validation failed"],
    },
    password: { type: String, require: true, select: false },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      require: true,
      message: "{VALUE} is not supported",
    },
    createdAt: { type: Number },
    updatedAt: { type: Number },
  },
  {
    timestamps: {
      currentTime: () => Math.floor(Date.now() / 1000),
    },
  }
);

export default mongoose.model("User", userSchema);
