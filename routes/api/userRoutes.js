// Import Express router
const router = require('express').Router();
// Import all user controllers
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
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
// Export module
module.exports = router;