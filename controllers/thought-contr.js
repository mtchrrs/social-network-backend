const { Thought, User } = require("../models");

// create the thought controller to create functions
const thoughtContr = {
    // create a function to collect all Thoughts
    getAllThoughts(req, res) {
        // send in a req and res to use in the function^
        // below - finds all Thoughts with no filters
        Thought.find({})
        // select the id by the value (auto generated)
        .select("-__v")
        // take this data, name it dbData and then return this in json
        .then((dbData) => res.json(dbData))
        // if something goes wrong, send an error 
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // creata a function to collect thoughts by Id
    getThoughtById({ params }, res) {
        // recieve the { params } which will show the id to collect
        // use the findOne function to find a Thought by the id of params
        Thought.findOne({_id: params.id})
        // then use this dbData and either return it (if there is something)
        // or send an error status
        .then((dbData) => {
            // send an error status...
            if(!dbData){
                res.status(404).json({ message: "There was no thought found with this Id"});
                return;
            }
            // or return the data as json
            res.json(dbData);
        })
        // if there is an error with the above, then return an error
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // process for a user to create a thought
    createThought({ body }, res) {
        // send in the body of the response - that the user inputs as a thought
        console.log(body);
        // create a thought sending in the body params
        Thought.create(body)
        .then((newData) => {
            // with the data sent from the body, use the return function to 
            // update the User that created the thought so it shows in their profile
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: newData._id }},
                { new: true }
            );
        })
        // then use the user data updated above and return it to the app
        .then((dbData) => {
            // if there is no data for the user above, send an error
            if(!dbData) {
                res.status(404).json({ message: "There was no user found"});
                return;
            }
            // if there is a user, send the data in json format to the app
            res.json(dbData);
        })
        // if there is an error with the above process, then return this
        .catch((err) => res.json(err));
    },
    // create a function that updates a thought by its Id
    updateThought({ params, body }, res) {
        // send in the params and the body content
        // then find a thought by the id using the params, and add the
        // body content as the updated thought
        Thought.findOneAndUpdate(
            { _id: params.id }, 
            body, 
            {new: true}
        )
        // then send an error is there is no thought by the above Id, or 
        // send the data to the application using json
        .then((dbData) => {
            if (!dbData){
                res.status(404).json({ message: "There is no thought found by that Id"});
                return;
            }
            res.json(dbData);
        })
        // if there is an error above, report it to the app
        .catch((err) => res.status(400).json(err));
    }, 
    // create a function that deletes a thought
    deleteThought({ params }, res) {
        // send in the params in order to delete a thought by id
        Thought.findOneAndDelete({ _id: params.id })
            // check if this Id exists, if not, return as json to the app
            .then((dbData) => {
            if (!dbData) {
                res.status(404).json({ message: "There was no thought found with this Id" });
                return;
            }
            // otherwise send the data to the app as a json
            res.json(dbData);
        }) 
        // if there is an error, send as a json to the app
        .catch((err) => res.status(400).json(err));
    },
    // create a function that adds a reaction
    addReaction({ params, body }, res) {
        // send in params (to update by id) and the body (to add reaction)
        // then find a thought by id and add the reaction
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $addToSet: { reactions: body } },
          { new: true }
        )
        // take this data and check if the thought exists, if not return this to the app
        .then((dbData) => {
            if (!dbData) {
              res.status(404).json({ message: "There was no thought found by with this Id" });
              return;
            }
            // else return the updated thought to the app 
            res.json(dbData);
        })
        // if this doesnt work, send an error
        .catch((err) => res.json(err));
    },
    // create a function that deletes a reaction
    // send the params to update the thought and delete the reaction
    deleteReaction({ params }, res) {
        // find a thought by id (that the reaction applied to) and pull the reaction from the thought
        Thought.findOneAndUpdate(
          { _id: params.thoughtId }, 
          { $pull: { reactions: { reactionId: params.reactionId } } },
          { new: true }
        )
        // then report this data back to the app
        .then((dbData) => res.json(dbData))
        // if this doesnt work, return the error to the app
        .catch((err) => res.json(err));
    },
};

module.exports = thoughtContr;