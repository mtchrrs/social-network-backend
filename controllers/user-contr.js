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
    createUser({ body }, res){
        // create a user by sending in the data included in the body
        User.create(body)
        // then return the data to the app in json
        .then((dbData) => res.json(dbData))
        // and catch any errors and return to the app in json
        .catch((err) => res.status(400).json(err));
    },
    // update a user by their id
    updateUser({ params, body }, res) {
        // send in the params to find the id, and then use the body to update the user
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
        // if there is no user, then let the app know, if there is, let the app know
        .then((dbData) => {
            if (!dbData) {
              res.status(404).json({ message: "No user found" });
              return;
            }
            // return the data to the app using json
            res.json(dbData);
        })
        // then catch the error if there is one and present it to the app
        .catch((err) => res.status(400).json(err));
    },
    
    // create a function to delete a user
    deleteUser({ params }, res) {
        // send in the params to delete a user by their id
        User.findOneAndDelete({ _id: params.id })
        // make sure that this user exists, if not notify the app
        .then((dbData) => {
            if(!dbData){
                res.status(404).json({ message: "There was no user found by this id"});
                return;
            }
            // else return the user as json data
            res.json(dbData);
        })
        // check to make sure that there are no errors, report if there are
        .catch((err) => res.status(400).json(err));
    },
    // create a function to add a friend
    addFriend({ params }, res) {
        // send in the params to find the user by id
        // then use the params to find the id of the friend to add to the user
        User.findOneAndUpdate(
            { _id: paranms.id },
            {$addToSet: { friends: params.friendsId } },
            { new: true }
        )
        // if there is no user, notify the app
        .then((dbData) => {
            if(!dbData){
                res.status(404).json({ message: "There is no user with this id" });
                return;
            }
            // if there is, return the data
            res.json(dbData);
        }) 
        // if there is an error, report it to the app
        .catch((err) => res.status(400).json(err));
    },
    // create a function to remove a friend
    removeFriend({ params }, res) {
        // send in the params in order to find the user by id and find the friend by their id
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendsId } },
            { new: true }
        )
        // check that this data does exist, if not, notify the app
        .then((dbData) => {
            if(!dbData){
                res.status(404).json({ message: "There is no uder with this id)"});
                return;
            }
            // if the user does exist, notify the app
            res.json(dbData);
        })
        // if there is an error, notify the app
        .catch((err) => res.status(400).json(err));
    }
}

module.exports = userContr;