const router = require('express').Router();

const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');

// Getting All users / creating User for database
router.route('/').get(getUser).post(createUser);

// Getting user by it's ID, updating User by it's ID, and deleting User by ID
router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

// Adding friends to a particular User by their ID, by incorporating another User's ID to be friends :) 
router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;