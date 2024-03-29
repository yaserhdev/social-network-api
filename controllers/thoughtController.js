// Import User and Thought models
const { User, Thought } = require('../models');

// Export and define controllers
module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID was found! ❌' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id }},
                { new: true }
            )
            res.json({ message: 'Thought successfully created! 💭' });
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID was found! ❌' });
            }
            res.json({ message: 'Thought successfully updated! 💭' });
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID was found! ❌' })
            }
            res.json({ message: 'Thought successfully deleted! 💭' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a reaction to a thought
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID was found! ❌' })
            }
            res.json({ message: 'Reaction successfully created! 😁' });
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a reaction
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.body } } },
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID was found! ❌' })
            }
            res.json({ message: 'Reaction successfully deleted! 😁' });
        } catch (err) {
            res.status(500).json(err);
        }
    }
};