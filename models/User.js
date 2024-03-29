// Import Mongoose as Schema and model
const { Schema, model } = require('mongoose');

// Create user schema
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create friendCount virtual property
userSchema.virtual('friendCount').get(function () {
    return `${this.friends.length}`;
});

// Create User model from user schema
const User = model('user', userSchema);

// Export module
module.exports = User;

