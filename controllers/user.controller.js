import User from "../models/User.js";
import bcrypt from "bcrypt";

// #####
// sign up
// #####

const signUp = async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const user = await User.create({ name, username, password });

    const token = user.generateToken();

    res.json({ message: "User created successfully", user, token });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to create user, username is already used" });
  }
};

// #####
// log in
// #####

const logIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      res.status(404).json({ message: "User not found. Please sign up" });
      return;
    }
    // const isPasswordValid = bcrypt.compareSync(password, user.password);
    const isPasswordValid = user.validPassword(password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    const token = user.generateToken();
    res.json({ message: "Login successful", user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to log in" });
  }
};

const logOut = async (req, res) => {
  // const token  = req.headers.authorization.split(" ")[1];
  // console.log(token)
  // console.log(req.headers);
  if (req.headers.authorization) {
    delete req.headers.authorization;
    res.json({ message: "Logout successful" });
  } else {
    res.json({ message: "No user login" });
  }
};

export default {
  signUp,
  logIn,
  logOut,
};
