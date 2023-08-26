const router = require('express').Router();

const {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction

} = require('../../controllers/thoughtController');

// routes for getting all thoughts / posting thoughts for users
router.route('/').get(getThought).post(createThought);

// getting a thought by it's ID, updating Thought by ID, and Delete Thought by ID
router.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

// creating reactions for a particular Thought (from it's ID)
router.route('/:thoughtId/reactions')
.post(createReaction);

// Deleting reaction affilated with Thought & the reaction ID associated with that Thought
router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;