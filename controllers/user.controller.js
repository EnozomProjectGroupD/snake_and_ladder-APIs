import User from "../models/User.js";
import bcrypt from "bcrypt";
import auth from "../middlewares/auth.js";


// #####
// sign up
// #####

const signUp = async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const user = await User.create({ name, username, password });
    // const token = auth.generateToken(user);
    console.log(user.id);

    const token = user.generateToken();

    res.json({ message: "User created successfully", user, token });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user",error });
  }
};

// #####
// log in
// #####

const logIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    const token = user.generateToken();

    if (!user) {
      res.status(404).json({ message: "User not found. Please sign up" });
      return;
    }
    console.log(user.password);
    // const isPasswordValid = bcrypt.compareSync(password, user.password);
    const isPasswordValid = user.validPassword(password);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    res.json({ message: "Login successful", user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to log in" });
  }
};



export default {
  signUp, 
  logIn
}