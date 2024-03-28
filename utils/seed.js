// Import connection
const connection = require('../config/connection');
// Import models
const { User, Thought, Reaction } = require('../models');
// Import data
const { users, thoughts, reactions } = require('./data');
// Open connection
connection.once('open', async () => {
    // Drop users collection if it already exists
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray;
    if (userCheck.length) {
        await connection.dropCollection('users');
    }
    // Drop thoughts collection if it already exists
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray;
    if (thoughtCheck.length) {
        await connection.db.dropCollection('thoughts');
    }
    // Drop reactions collection if it already exists
    let reactionCheck = await connection.db.listCollections({ name: 'reactions' }).toArray;
    if (reactionCheck.length) {
        await connection.db.dropCollection('reactions');
    }
    // Seed users, thoughts, and reactions
    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);
    await Reaction.collection.insertMany(reactions);
    // Log seeding results
    console.table(users);
    console.table(thoughts);
    console.table(reactions);
});