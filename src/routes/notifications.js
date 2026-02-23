const { Router } = require('express');
const auth = require('../middleware/auth');
const { cacheFor } = require('../middleware/cache');
const controller = require('../controllers/notificationController');

const router = Router();

// NOTE: /read-all must come BEFORE /:id/read to avoid route conflict
router.patch('/read-all', auth, controller.markAllAsRead);
router.get('/', auth, cacheFor(10), controller.getNotifications);
router.patch('/:id/read', auth, controller.markAsRead);

module.exports = router;
