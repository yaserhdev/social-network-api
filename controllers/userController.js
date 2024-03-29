// Import User model
const User = require('../models/User');

// Export and define controllers
module.exports = {
    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find()
            .populate('thoughts')
            .populate('friends');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                // .select('-__v');
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID was found! ❌' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json({ message: 'User successfully created! 👨‍💻' });
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Update a user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            )
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID was found! ❌' });
            }
            res.json(user);
            res.json({ message: 'User successfully updated! 👨‍💻' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId })
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID was found! ❌' });
            }
            // BONUS: Delete a deleted users associated thoughts
            const thought = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { thoughts: user.thoughts } },
                { new: true }
            )
            res.json({ message: 'User successfully deleted! 👨‍💻' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Add friend to users friend list
    async addFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            )
            if (!friend) {
                return res.status(404).json({ message: 'No user with that ID was found! ❌' });
            }
            res.json({ message: 'Friend added! 👥' });
            res.json(friend);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Remove friend from users friend list
    async deleteFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: { userId: req.params.userId } } },
                { runValidators: true, new: true }
            )
            if (!friend) {
                return res.status(404).json({ message: 'No user with that ID was found! ❌' })
            }
            res.json({ message: 'Friend removed! 👥' });
        } catch (err) {
            res.status(500).json(err)
        }
    }
};