// Import Mongoose as Schema and model
const { Schema, model } = require('mongoose');

// Create reaction schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectID(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: date => date.toLocaleDateString(),
        },
    }
);

// Create thought schema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: date => date.toLocaleDateString(),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    }
);

// Create Thought model from thought schema
const Thought = model('thought', thoughtSchema);

// Export module
module.exports = Thought;