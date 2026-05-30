
import Support from "../models/Support.js";
import User from "../models/User.js";

export const createSupport = async (req, res) => {
  try {
    const {
      creatorId,
      coffeeAmount,
      toffeeAmount,
      totalAmount,
      message,
      coverGST,
    } = req.body;

    const supporterId = req.user._id;
    const creator = await User.findById(creatorId);

    if (!creatorId) {
      return res.status(400).json({ message: "Creator ID required" });
    }

    if (!creator) {
      return res.status(404).json({
        message: "Creator not found",
      });
    }

    if (creatorId === supporterId.toString()) {
      return res.status(400).json({
        message: "You cannot support yourself",
      });
    }

    const support = await Support.create({
      supporterId,
      creatorId,
      coffeeAmount,
      toffeeAmount,
      totalAmount,
      message,
      coverGST,
      paymentStatus: "success", // mock for now
    });

    await User.findByIdAndUpdate(creatorId, {
      $inc: {
        supporterCount: 1,
        coffeeCount: Number(coffeeAmount) || 0,
        toffeeCount: Number(toffeeAmount) || 0,
      },
    });

    return res.status(201).json({
      message: "Support created successfully",
      support,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


export const getCreatorSupports = async (req, res) => {
  try {
    const { creatorId } = req.params;

    const supports = await Support.find({ creatorId })
      .populate("supporterId", "name profileImage username")
      .sort({ createdAt: -1 });

    return res.status(200).json({ supports });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getMySupports = async (req, res) => {
  try {
    const userId = req.user._id;

    const supports = await Support.find({ supporterId: userId })
      .populate("creatorId", "name profileImage username")
      .sort({ createdAt: -1 });

    return res.status(200).json({ supports });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// export const getSupportsForCreator = async (req, res) => {
// const supports = await Support.find({
//   creatorId: req.params.creatorId,
// })
//   .populate("supporterId", "name profileImage")
//   .sort({ createdAt: -1 });

//   res.status(200).json({
//     success: true,
//     supports,
//   });
// };