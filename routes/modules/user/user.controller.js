import User from '../../../models/User';

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
 