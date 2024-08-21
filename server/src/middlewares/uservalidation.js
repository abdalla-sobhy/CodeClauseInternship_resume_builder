import User from "../models/user.js";
import jwt from "jsonwebtoken";
 /*global process*/

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
export async function validateCurrentUser(req, res) {
  {
    try {
      const accessToken = req.cookies.jwt;

      if (!accessToken) {
        return res.status(401).json({ message: "Token not provided" });
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
        return res.status(200).json(user.username);
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
  }
}
