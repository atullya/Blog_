const User = require("../models/userModel");

const getAllUserDetail = async (req, res) => {
  try {
    // Fetch all users where the role is not 'admin'
    const allUser = await User.find({ role: { $ne: "admin" } });

    // If no users are found
    if (allUser.length === 0) {
      return res.status(404).json({
        message: "No users found who are not admins",
      });
    }

    // Return all users who are not admins
    return res.status(200).json({
      success: true,
      Users: allUser,
    });
  } catch (error) {
    // Catch and handle any errors that may occur
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const removeUser = async (req, res) => {
  try {
    let id = req.params.id;
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      return res.status(400).json({
        message: "Unable to delete the user. Please try again.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User successfully deleted.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

module.exports = { getAllUserDetail, removeUser };
