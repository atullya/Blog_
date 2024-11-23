const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
var jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  try {
    const userData = req.body;

    console.log("Incoming request body:", req.body);

    // Validate input
    if (!userData.username || !userData.email || !userData.password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required (username, email, password).",
      });
    }

    // Check if user already exists
    const findExistingUser = await User.findOne({ email: userData.email });

    if (findExistingUser) {
      return res.status(400).json({
        success: false,
        message: "User with the email already exists. Please try again.",
      });
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(userData.password, salt);
    console.log("Password before hashing:", userData.password);
    console.log("Hashed password:", hash);

    // Create user
    const newUser = new User({
      username: userData.username,
      email: userData.email,
      password: hash,
    });

    console.log("User instance before saving:", newUser);

    // Save user to database
    await newUser.save();

    // Respond with success
    return res.status(200).json({
      success: true,
      message: "User registered successfully.",
      userDetail: newUser,
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Find user by email
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials. Please sign up first.",
      });
    }

    // Validate password
    const isPasswordValid = bcrypt.compareSync(password, validUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials. Please try again.",
      });
    }

    // Create access token
    const accessToken = jwt.sign(
      {
        userId: validUser._id,
        username: validUser.username,
        email: validUser.email,
        role: validUser.role,
      },
      process.env.JWT_SECRET_KEY, // Use a fallback key for testing
      { expiresIn: "55m" }
    );

    // Respond with success
    return res.status(200).json({
      success: true,
      message: "Login successful.",
      accessToken,
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};
const logoutUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the Authorization header

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "No token provided.",
      });
    }

    // Optional: Add the token to a blacklist (or handle token invalidation in the database)
    // Example: Store the token in a blacklist (use a database or in-memory store)
    // await TokenBlacklist.create({ token });

    // Respond to confirm successful logout
    return res.status(200).json({
      success: true,
      message: "Logout successful.",
    });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser };
