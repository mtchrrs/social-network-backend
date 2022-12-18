const { Schema, Types } = require("mongoose");

// create a new schema with the following properties
const reactionSchema = new Schema(
    {
        // reactionId -> to find the reaction when searching through thoughts
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        // reactionBody -> to record the actual content of the reaction
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        // username -> to record which user made that reaction
        username: {
            type: String,
            required: true,
        },
        // createdAt -> to record the date and time that the reaction was created
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);
  
module.exports = reactionSchema;