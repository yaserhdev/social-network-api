// Import Express router
const router = require('express').Router();
// Import user routes
const userRoutes = require('./userRoutes');
// Import thought routes
const thoughtRoutes = require('./thoughtRoutes');
// Use routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
// Export module
module.exports = router;