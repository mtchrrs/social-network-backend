const router = require("express").Router();

// add all of the functions from the controller
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend } = require("../../controllers/user-controller");

// when on the api homepage, allow to get users and create them
router.route("/").get(getAllUsers).post(createUser);

// the following require the id params
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// te following require a user id, the friends param, and the friends id param
router.route("/:id/friends/:friendsId").post(addFriend).delete(removeFriend);

module.exports = router;