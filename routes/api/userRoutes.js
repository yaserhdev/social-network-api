// Import Express router
const router = require('express').Router();
// Import all user controllers
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');
// Route for /api/users
router.route('/')
    .get(getUsers)
    .post(createUser);
// Route for /api/:userId
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);
// Route for /api/:userId/friends/:friendId
router.route('/api/:userId/friends/:friendId')
    .put(addFriend)
    .delete(deleteFriend);
// Export module
module.exports = router;