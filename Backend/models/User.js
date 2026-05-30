import mongoose from "mongoose";

const socialSchema = new mongoose.Schema({
  website: String,
  instagram: String,
  dribbble: String,
  linkedin: String,
  twitter: String,
  github: String,
});

const achievementSchema = new mongoose.Schema({
  icon: String,
  label: String,
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    title: String,

    bio: {
      type: String,
      maxlength: 250,
    },

    location: String,

    profileImage: String,
    coverImage: String,

    socialLinks: socialSchema,

    achievements: [achievementSchema],

    supporterCount: {
      type: Number,
      default: 0,
    },

    coffeeCount: {
      type: Number,
      default: 0,
    },

    toffeeCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);