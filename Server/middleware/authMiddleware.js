const jwt = require("jsonwebtoken");

const 
authMiddleWare = (req, res, next) => {
  try {
    // Get the Authorization header
    const authHeader = req.headers["authorization"];

    // Check if the Authorization header exists
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing. Access Denied.",
      });
    }

    // Extract the token
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing. Access Denied.",
      });
    }

    // Verify the token
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY || "defaultSecretKey"
      );
      console.log("Decoded Token:", decoded);

      // Attach user info to the request
      req.userInfo = decoded;

      // Proceed to the next middleware or route handler
      next();
    } catch (err) {
      console.error("JWT Verification Error:", err);
      return res.status(403).json({
        success: false,
        message: "Invalid or expired token. Access Denied.",
      });
    }
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = authMiddleWare;
