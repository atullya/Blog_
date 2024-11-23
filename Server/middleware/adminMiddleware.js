const adminMiddleware = (req, res, next) => {
  if (req.userInfo.role !== "admin") {
    return res.status(200).json({
      success: true,
      message: "Access Denied! Admin rights required",
    });
  }
  next();
};

module.exports = adminMiddleware;
