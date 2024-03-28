const { Schema, model } = require('mongoose');

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

const Thought = model('thought', thoughtSchema);
const Reaction = model('reaction', reactionSchema);

module.exports = { Thought, Reaction };