
import jwt from "jsonwebtoken";

const isProduction = process.env.NODE_ENV === "production";
const clearCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax"
};

const isAuth = async (req, res, next) => {
  try {
    let { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    let verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifyToken) {
      res.clearCookie("token", clearCookieOptions);
      return res.status(401).json({ message: "Token is not valid" });
    }

    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    res.clearCookie("token", clearCookieOptions);
    return res.status(401).json({ message: "Token verification failed" });
  }
};

export default isAuth;