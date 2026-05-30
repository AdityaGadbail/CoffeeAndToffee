import User from "../models/User.js";

const publicUserSelect = "-password";

const buildSocialLinks = (body) => ({
  website: body.website,
  instagram: body.instagram,
  dribbble: body.dribbble,
  linkedin: body.linkedin,
  twitter: body.twitter,
  github: body.github,
});

export const getUserByUsername = async (req, res) => {
  try {
    const username = req.params.username?.trim();

    const user = await User.findOne({
      username: {
        $regex: new RegExp(`^${username.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i"),
      },
    }).select(publicUserSelect);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const search = req.query.search?.trim();
    const filter = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { username: { $regex: search, $options: "i" } },
            { title: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(filter)
      .select(publicUserSelect)
      .sort({ supporterCount: -1, createdAt: -1 });

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const updates = {
      title: req.body.title,
      bio: req.body.bio,
      location: req.body.location,
      socialLinks: buildSocialLinks(req.body),
    };

    if (req.files?.profileImage?.[0]?.path) {
      updates.profileImage = req.files.profileImage[0].path;
    }

    if (req.files?.coverImage?.[0]?.path) {
      updates.coverImage = req.files.coverImage[0].path;
    }

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        currentUser[key] = value;
      }
    });

    await currentUser.save();

    const safeUser = currentUser.toObject();
    delete safeUser.password;

    return res.status(200).json({
      message: "Profile updated successfully",
      user: safeUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};