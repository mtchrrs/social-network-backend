const { Schema, model, Types } = require("mongoose");

// connect the reactionScehma to the thoughtSchema
const reactionSchema = require("./Reaction.js")

// create a thoughtSchema with the following properties
const thoughtSchema = new Schema(
    {
        // thoughtText -> the content of the comment/thought
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
        },
        // createdAt -> the date and time created
        createdAt: {
            type: Date,
            default: Date.now,
        },
        // username -> the user that created the thought
        userId: {
            type: String,
            required: true,
        },
        // reactions -> connect the reactionSchema to the thoughtSchema
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// returns the amount of reactions to each thought
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// create the model Thought based off of the thoughtSchema
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;