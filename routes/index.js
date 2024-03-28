// Import Express router
const router = require('express').Router();
// Import api routes
const apiRoutes = require('./api');
// Use api routes
router.use('/api', apiRoutes);
// Wrong route handling
router.use((req, res) => {
    return res.send('Wrong route!');
});
// Export module
module.exports = router;