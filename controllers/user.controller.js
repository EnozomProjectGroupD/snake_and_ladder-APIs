import User from "../models/User.js";
import bcrypt from "bcrypt";


// #####
// sign up
// #####

const signUp = async (req, res) => {
  const { name, username, password } = req.body;
  try {
    // const foundUser =await User.findOne({username})
    // if(foundUser){
    //   res.status(400).send('user name already exists');
    //   return;
    // }
    const user = await User.create({ name, username, password });
    res.json({ message: "User created successfully", user });
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
    if (!user) {
      res.status(404).json({ message: "User not found. Please sign up" });
      return;
    }
    console.log(user.password);
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    res.json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to log in" });
  }
};



export default {
  signUp, 
  logIn
}