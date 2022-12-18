const { User } = require("../models");

const userContr = {
    // create a function to find all users
    getAllUsers(req, res) {
        // find all users using no filters
        User.findAll({})
        // then use the populate function to add the thoughts associate with each user to attach
        .populate({
            path: "thoughts",
            select: "-__v",
        })
        // select the values
        .select("-__v")
        // then return this data to the app
        .then((dbData) => res.json(dbData))
        // if this doesnt work, return an error to the application
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // create a function to find a user by Id
    getUserbyId({ params }, res) {
        // send in the params to use to find the user by id
        User.findOne({ _id: params.id })
        // once found, use populate to find all thoughts and reactions
        .populate({
            path: "thoughts",
            select: "-__v",
        })
        // then select by value (auto generated) to present to the app
        .select("-__v")
        // then if there is no id, notify the app, else, send the data to the app
        .then((dbData) => {
            if(!dbData){
                res.status(404).json({ message: "There was no user found by this id"});
                return;
            }
            res.json(dbData);
        })
        // if there is an error, catch this and notify the app
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // create a function to create a new user
    // create a function to delete a user
    // create a function to add a friend
    // create a function to remove a friend
}

module.exports = userContr;