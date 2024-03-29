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
router.route('/')
    .get(getThoughts)
    .post(createThought);
// Route for /api/:thoughtId
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);
// Route for /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(createReaction);
// Router for /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);
// Export module
module.exports = router;