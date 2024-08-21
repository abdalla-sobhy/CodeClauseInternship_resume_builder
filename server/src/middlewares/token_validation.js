import jwt from "jsonwebtoken";
import User from "../models/user.js";

const accessTokenOptions = {
  httpOnly: true,
  secure: false, // Set to true in production
  maxAge: 3600000, // 1 hour
  sameSite: "strict",
};
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns
 */
export const authenticateToken = async (req, res, next) => {
  try {
    const accessToken = req.cookies.jwt;
    const refreshToken = req.cookies.refreshToken;
    if (!accessToken) {
      if (refreshToken) {
        try {
          const decodedRefreshToken = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_TOKEN
          );

          if (decodedRefreshToken) {
            const newAccessToken = jwt.sign(
              {
                id: decodedRefreshToken.id,
              },
              process.env.JWT_ACCESS_SECRET,
              { expiresIn: "1h" }
            );

            res.cookie("jwt", newAccessToken, accessTokenOptions);
            req.headers.authorization = `Bearer ${newAccessToken}`;
            return res
              .status(200)
              .json("New access token issued", decodedRefreshToken);
          }
        } catch (refreshError) {
          console.error("Refresh token error:", refreshError);
          return res.status(401).json({ message: "Invalid refresh token" });
        }
      } else {
        return res.status(401).json({ message: "Token not provided" });
      }
    }

    try {
      const decodedAccessToken = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET
      );

      if (!decodedAccessToken) {
        return res
          .status(403)
          .json({ message: "Invalid or expired access token" });
      }

      const user = await User.findById(decodedAccessToken.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      req.user = user;
      next();
    } catch (accessError) {
      console.error("Access token verification error:", accessError);
      return res
        .status(403)
        .json({ message: "Invalid or expired access token" });
    }
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
