const router = require("express").Router();

// get the created controllers from the thought-contr
const { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, deleteReaction } = require("../../controllers/thought-contr");

// when on "/" page, get all thoughts and allow for the create thought
router.route("/").get(getAllThoughts).post(createThought);

// the following require an id in the params "/:id"
router.route("/:id").get(getThoughtById).put(updateThought).delete(deleteThought);

// the following relate to reactions by thought Id
router.route("/:thoughtId/reactions").post(addReaction).delete(deleteReaction);

module.exports = router;