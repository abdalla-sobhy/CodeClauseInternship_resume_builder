import User from "../models/user.js";
import jwt from "jsonwebtoken";

const accessTokenCookieOptions = {
  httpOnly: true,
  secure: false,
  maxAge: 3600000,
  sameSite: "strict",
};

const refreshTokenCookieOptions = {
  httpOnly: true,
  secure: false,
  maxAge: 604800000,
  sameSite: "strict",
};

export async function login(req, res) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const findUser = await User.findOne({
      username: user.username,
      password: user.password,
    });

    if (!findUser) {
      return res.status(404).json({ message: "Couldn't find account" });
    }

    const accessToken = jwt.sign(
      { id: findUser._id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: findUser._id },
      process.env.JWT_REFRESH_TOKEN,
      { expiresIn: "7d" }
    );

    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
    res.cookie("jwt", accessToken, accessTokenCookieOptions);
    return res
      .status(200)
      .json({ username: findUser.username, id: findUser._id });
  } catch (error) {
    console.error(error);
    res.status(500).json("Unexpected Error");
  }
}

export async function register(req, res) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const findUser = await User.findOne({
      username: user.username,
      password: user.password,
    });

    if (findUser) {
      return res.status(401).json({ message: "Username already taken" });
    }

    const newUser = await User.create(user);
    newUser.save();

    const accessToken = jwt.sign(
      {  id: newUser._id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { username: newUser.username, userId: newUser._id },
      process.env.JWT_REFRESH_TOKEN,
      { expiresIn: "7d" }
    );

    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
    res.cookie("jwt", accessToken, accessTokenCookieOptions);
    return res.status(201).json({ username: newUser.username });
  } catch (error) {
    console.error(error);
    res.status(500).json("Unexpected Error");
  }
}
