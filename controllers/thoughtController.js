const { Thought, User } = require('../models');

// Getting all thoughts
const getThought = async (req, res) => {
    try {
        const thoughts = await Thought.find({});
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
};


const getSingleThought = async (req, res) => {
    try {
        const thought = await Thought.findOne({_id: req.params.thoughtId}).select('-__v');
        
        if (!thought) {
            return res.status(404).json({message: 'No Thought found with this ID!'});
        }
        
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

const createThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        
        const user = await User.findOneAndUpdate(
            {_id: req.body.userId},
            {$push: {thoughts: thought._id}},
            {new: true}
        );
        
        if (!user) {
            return res.status(404).json({message: 'No User found with this ID!'});
        }
        
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true}
        );

        if (!thought) {
            return res.status(404).json({message: 'No thought Found with this ID!'});
        }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId});

        if (!thought) {
            return res.status(404).json({message: 'No thought found with this ID!'});
        }

        const user = await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            {$pull: {thoughts: req.params.thoughtId}},
            {runValidators: true, new: true}
        );

        if (!user) {
            return res.status(404).json({ message: 'Thought deleted, but no user found'});
        }

        res.json({message: 'Thought successfully deleted'});
    } catch (err) {
        res.status(500).json(err);
    }
};

const createReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true}
        );

        if (!thought) {
            return res.status(404).json({message: 'No thought found with this ID!'});
        }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true}
        );

        if (!thought) {
            return res.status(404).json({message: 'No thought found with this ID!'});
        }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
}