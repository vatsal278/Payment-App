const notificationModel = require('../models/notificationModel');
const ApiError = require('../utils/errors');

// ────────────────────────────────────────────────────────
// GET /api/notifications?page=1&limit=20
// ────────────────────────────────────────────────────────
async function getNotifications(req, res, next) {
    try {
        const userId = req.user.id;
        const page = Math.max(1, parseInt(req.query.page, 10) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
        const offset = (page - 1) * limit;

        const [unreadCount, total, notifications] = await Promise.all([
            notificationModel.countUnread(userId),
            notificationModel.countAll(userId),
            notificationModel.findPaginated(userId, limit, offset),
        ]);

        res.json({
            success: true,
            data: {
                notifications,
                unreadCount,
                pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
            },
            message: '',
            error: '',
        });
    } catch (err) {
        next(err);
    }
}

// ────────────────────────────────────────────────────────
// PATCH /api/notifications/:id/read
// ────────────────────────────────────────────────────────
async function markAsRead(req, res, next) {
    try {
        const notification = await notificationModel.markAsRead(req.params.id, req.user.id);
        if (!notification) throw ApiError.notFound('Notification not found or unauthorized');

        res.json({
            success: true,
            data: { notification },
            message: 'Marked as read',
            error: '',
        });
    } catch (err) {
        next(err);
    }
}

// ────────────────────────────────────────────────────────
// PATCH /api/notifications/read-all
// ────────────────────────────────────────────────────────
async function markAllAsRead(req, res, next) {
    try {
        const count = await notificationModel.markAllAsRead(req.user.id);

        res.json({
            success: true,
            data: { markedCount: count },
            message: count > 0 ? `Marked ${count} notification(s) as read` : 'No unread notifications',
            error: '',
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { getNotifications, markAsRead, markAllAsRead };

