const { User, Thought } = require("../models/index");

// Getting all User's Data 
const getUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Getting a single User's Data (from Id) / populating 'friends' & 'thoughts' data
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId }).select("-__v").populate('friends').populate('thoughts');

    if (!user) {
      return res.status(404).json({ message: "No User found with that ID!" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Creating a new User
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// Updating a User 
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

// Deleting User
const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId }); // removing from array of thoughts

    if (!user) {
      return res.status(404).json({ message: "No User found with this ID!" });
    }
    await Thought.deleteMany({ _id: { $in: user.thoughts } }); 
    res.json({ message: "User and Thought deleted!" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Adding a friend to the User (affilated with User ID)
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

// Delete a friend for User (by ID)
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
