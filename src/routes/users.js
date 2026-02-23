const { Router } = require('express');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const controller = require('../controllers/userController');

const router = Router();

// ── Validation schemas ───────────────────────────────

const updateProfileSchema = {
    fullName: { type: 'string', required: false, min: 1, max: 255 },
    avatarUrl: { type: 'string', required: false },
};

const changePasswordSchema = {
    currentPassword: { type: 'string', required: true },
    newPassword: { type: 'string', required: true, min: 6, max: 128 },
};

// ── Routes ───────────────────────────────────────────
// NOTE: /search and /profile must come BEFORE /:cashtag to avoid being caught by the param route

router.get('/search', auth, controller.searchUsers);
router.patch('/profile', auth, validate(updateProfileSchema), controller.updateProfile);
router.patch('/password', auth, validate(changePasswordSchema), controller.changePassword);
router.get('/:cashtag', auth, controller.getUserProfile);

module.exports = router;
