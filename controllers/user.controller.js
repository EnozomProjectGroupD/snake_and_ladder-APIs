import User from "../models/User.js";

// #####
// sign up
// #####

const signUp = async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const foundUser =await User.findOne({username})
    if(foundUser){
      res.status(400).send('user name already exists');
      return;
    }
    const user = await User.create({ name, username, password });
    res.json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create user" });
  }
};

// #####
// log in
// #####

const logIn = async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  try {
    const user = await User.findOne({ username, password });
    res.json({ message: "logIn successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "user not found please sign up" });
  }
};


export default {
  signUp, 
  logIn
}