// Import connection
const connection = require('../config/connection');
// Import models
const { User, Thought } = require('../models');
// Import data
const { users, thoughts } = require('./data');
// Open connection
connection.once('open', async () => {
    await User.collection.deleteMany();
    await Thought.collection.deleteMany();
    // Seed users, thoughts, and reactions
    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);
    console.info('Seeding complete!');
    process.exit(0)
});