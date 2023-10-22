import User from "../models/User.js";

export const getUsers = async (req, res, next) => {
  let users;
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  if (users == null) {
    return res.status(404).json({ message: "Cannot find user" });
  }
  return res.status(200).json({ users });
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
