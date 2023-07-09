import User from '../models/User';

// #####
// sign up
// #####

export const signUp = async (req, res) => {
  const { name, userName, password } = req.body;
  try {
    const user = await User.create({ name, userName, password });
    res.json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create user" });
  }
};
 


// #####
// log in
// #####

export const login = async (req, res) => {
    const {  userName, password } = req.body;
    try {
      const user = await User.findOne({  userName, password });
      res.json({ message: "login successfully", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "user not found please sign up" });
    }
  };
   