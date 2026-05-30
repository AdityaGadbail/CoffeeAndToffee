import mongoose from "mongoose";

const supportSchema = new mongoose.Schema(
  {
    supporterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    coffeeAmount: {
      type: Number,
      default: 0,
    },

    toffeeAmount: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    message: {
      type: String,
      maxlength: 250,
      default: "",
    },

    coverGST: {
      type: Boolean,
      default: false,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "success", // for now (we will integrate Razorpay later)
    },
  },
  { timestamps: true }
);

const Support = mongoose.model("Support", supportSchema);

export default Support;