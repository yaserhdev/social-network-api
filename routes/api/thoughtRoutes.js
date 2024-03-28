// Import Express router
const router = require('express').Router();
// Import all user controllers
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');
// Route for /api/thoughts
router.route('/api/thoughts')
    .get(getThoughts)
    .post(createThought);
// Route for /api/:thoughtId
router.route('/api/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);
// Route for /api/thoughts/:thoughtId/reactions
router.route('/api/thoughts/:thoughtId/reactions')
    .post(createReaction)
    .delete(deleteReaction);
// Export module
module.exports = router;