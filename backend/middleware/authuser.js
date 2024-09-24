const jwt = require("jsonwebtoken");

const verifyUserToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {

    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.userId;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = verifyUserToken;
