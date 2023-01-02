const router = require("express").Router();

// add all of the functions from the controller
const { getAllUsers, getUserbyId, createUser, updateUser, deleteUser, addFriend, removeFriend } = require("../../controllers/user-contr");

// when on the api users homepage, allow to get users and create them
router.route("/").get(getAllUsers).post(createUser);

// the following require the id params
router.route("/:id").get(getUserbyId).put(updateUser).delete(deleteUser);

// te following require a user id, the friends param, and the friends id param
router.route("/:id/friends/:friendsId").post(addFriend).delete(removeFriend);

module.exports = router;