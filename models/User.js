const { Schema, model } = require("mongoose");

// add the ThoughtSchema to the User to connect thoughts
const ThoughtSchema = require("./Thought");

// create a userSchema with the following properties
const userSchema = new Schema(
    {
        // username -> to name the user
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        // email -> to contact the user
        email: {
            type: String,
            unique: true,
            required: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email address",
            ],
        },
        // thoughts -> to connect the ThoughtSchema
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],
        // friends -> to connect associated friends
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        toJSON: {
        virtuals: true,
        getters: true,
        },
        id: false,
    }
);

// get total count of friends for each User
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// create the User model using the userSchema above 
const User = model("User", userSchema);

module.exports = User;