const { User, Thought } = require("../models");

const getUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSingleUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId }).select("-__v");

    if (!user) {
      return res.status(404).json({ message: "No User found with that ID!" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "No User found with this ID!" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId });

    if (!user) {
      return res.status(404).json({ message: "No User found with this ID!" });
    }
    await Thought.deleteMany({ _id: { $in: user.thoughts } });
    res.json({ message: "User and Thought deleted!" });
  } catch (err) {
    res.status(500).json(err);
  }
};

const addFriend = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "No User found with this ID!" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteFriend = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "No User found with this ID!" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  addFriend,
  deleteUser,
  deleteFriend,
};
