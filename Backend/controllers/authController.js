
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const publicUser = (user) => {
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

export const registerUser = async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      password,
      title,
      bio,
      location,

      website,
      instagram,
      linkedin,
      github,
      twitter,
      dribbble,
    } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profileImage =
      req.files?.profileImage?.[0]?.path || "";

    const coverImage =
      req.files?.coverImage?.[0]?.path || "";

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,

      title,
      bio,
      location,

      profileImage,
      coverImage,

      socialLinks: {
        website,
        instagram,
        linkedin,
        github,
        twitter,
        dribbble,
      },
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: publicUser(user),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: publicUser(user),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};