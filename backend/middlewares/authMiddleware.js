const jwt = require("jsonwebtoken");

const User = require("../models/user");

const protect = async (req, res, next) => {

  let token;

  try {

    // CHECK TOKEN EXISTS
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {

      // GET TOKEN
      token = req.headers.authorization.split(" ")[1];

      // VERIFY TOKEN
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // GET USER FROM TOKEN
      req.user = await User.findById(decoded.id).select("-password");

      next(); //yaha se req.user mera controller me chala jayega

    } else {

      res.status(401).json({
        message: "Not authorized, no token",
      });

    }

  } catch (error) {

    res.status(401).json({
      message: "Not authorized, token failed",
    });

  }
};

module.exports = { protect };