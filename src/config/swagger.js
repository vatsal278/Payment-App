const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'FlowCash API',
            version: '1.0.0',
            description: 'A Cash App clone — peer-to-peer payment platform API',
            contact: { name: 'FlowCash Team' },
        },
        servers: [
            { url: 'http://localhost:3000', description: 'Development' },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                // ── Standard response envelope ──
                SuccessResponse: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: true },
                        data: { type: 'object' },
                        message: { type: 'string' },
                        error: { type: 'string', example: '' },
                    },
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: false },
                        data: { type: 'object', nullable: true, example: null },
                        message: { type: 'string' },
                        error: { type: 'string' },
                    },
                },
                // ── Domain ──
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', format: 'uuid' },
                        email: { type: 'string', format: 'email' },
                        phone: { type: 'string', nullable: true },
                        cashtag: { type: 'string', example: '$johndoe' },
                        full_name: { type: 'string' },
                        avatar_url: { type: 'string', nullable: true },
                        is_verified: { type: 'boolean' },
                        created_at: { type: 'string', format: 'date-time' },
                        updated_at: { type: 'string', format: 'date-time' },
                    },
                },
                Transaction: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', format: 'uuid' },
                        sender_id: { type: 'string', format: 'uuid' },
                        receiver_id: { type: 'string', format: 'uuid' },
                        amount: { type: 'integer', description: 'Amount in cents' },
                        status: { type: 'string', enum: ['pending', 'completed', 'failed', 'cancelled'] },
                        note: { type: 'string', nullable: true },
                        type: { type: 'string', enum: ['send', 'request'] },
                        created_at: { type: 'string', format: 'date-time' },
                        updated_at: { type: 'string', format: 'date-time' },
                    },
                },
                Pagination: {
                    type: 'object',
                    properties: {
                        total: { type: 'integer' },
                        page: { type: 'integer' },
                        limit: { type: 'integer' },
                        totalPages: { type: 'integer' },
                    },
                },
            },
        },
        // ── Paths ──────────────────────────────────────────
        paths: {
            // ═══════════════ HEALTH ═══════════════
            '/api/health': {
                get: {
                    tags: ['Health'],
                    summary: 'Server health check',
                    responses: {
                        200: { description: 'Server is healthy', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponse' } } } },
                    },
                },
            },

            // ═══════════════ AUTH ═══════════════
            '/api/auth/register': {
                post: {
                    tags: ['Auth'],
                    summary: 'Register a new user',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['email', 'password', 'fullName'],
                                    properties: {
                                        email: { type: 'string', format: 'email', example: 'user@example.com' },
                                        password: { type: 'string', minLength: 6, example: 'securepass123' },
                                        fullName: { type: 'string', example: 'John Doe' },
                                        phone: { type: 'string', example: '+15551234567' },
                                        cashtag: { type: 'string', example: '$johndoe', description: 'Optional — auto-generated from name if omitted' },
                                    },
                                }
                            }
                        },
                    },
                    responses: {
                        201: { description: 'User created + JWT tokens returned' },
                        400: { description: 'Validation error' },
                        409: { description: 'Email or cashtag already taken' },
                    },
                },
            },
            '/api/auth/login': {
                post: {
                    tags: ['Auth'],
                    summary: 'Login with email and password',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['email', 'password'],
                                    properties: {
                                        email: { type: 'string', format: 'email', example: 'user@example.com' },
                                        password: { type: 'string', example: 'securepass123' },
                                    },
                                }
                            }
                        },
                    },
                    responses: {
                        200: { description: 'Login successful — returns tokens + user object' },
                        401: { description: 'Invalid email or password' },
                    },
                },
            },
            '/api/auth/me': {
                get: {
                    tags: ['Auth'],
                    summary: 'Get current authenticated user profile + balance',
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: { description: 'User profile and wallet balance' },
                        401: { description: 'Unauthorized' },
                    },
                },
            },
            '/api/auth/logout': {
                post: {
                    tags: ['Auth'],
                    summary: 'Logout (stateless — discard token client-side)',
                    security: [{ bearerAuth: [] }],
                    responses: { 200: { description: 'Success message' } },
                },
            },
            '/api/auth/refresh': {
                post: {
                    tags: ['Auth'],
                    summary: 'Refresh access token',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['refreshToken'],
                                    properties: { refreshToken: { type: 'string' } },
                                }
                            }
                        },
                    },
                    responses: {
                        200: { description: 'New access + refresh tokens' },
                        401: { description: 'Invalid or expired refresh token' },
                    },
                },
            },

            // ═══════════════ TRANSFER ═══════════════
            '/api/transfer/send': {
                post: {
                    tags: ['Transfer'],
                    summary: 'Send money to another user',
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['cashtag', 'amount'],
                                    properties: {
                                        cashtag: { type: 'string', example: '$alice', description: 'Receiver cashtag' },
                                        amount: { type: 'integer', minimum: 1, example: 5000, description: 'Amount in cents ($50.00 = 5000)' },
                                        note: { type: 'string', example: 'Lunch 🍕' },
                                    },
                                }
                            }
                        },
                    },
                    responses: {
                        201: { description: 'Transfer completed — returns transaction record' },
                        400: { description: 'Insufficient balance / invalid input' },
                        404: { description: 'Receiver not found' },
                    },
                },
            },
            '/api/transfer/request': {
                post: {
                    tags: ['Transfer'],
                    summary: 'Request money from another user',
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['cashtag', 'amount'],
                                    properties: {
                                        cashtag: { type: 'string', example: '$bob' },
                                        amount: { type: 'integer', minimum: 1, example: 2000 },
                                        note: { type: 'string', example: 'Gas money' },
                                    },
                                }
                            }
                        },
                    },
                    responses: {
                        201: { description: 'Request created (pending)' },
                        404: { description: 'User not found' },
                    },
                },
            },
            '/api/transfer/respond/{transactionId}': {
                post: {
                    tags: ['Transfer'],
                    summary: 'Accept or decline a payment request',
                    security: [{ bearerAuth: [] }],
                    parameters: [{ name: 'transactionId', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['action'],
                                    properties: {
                                        action: { type: 'string', enum: ['accept', 'decline'] },
                                    },
                                }
                            }
                        },
                    },
                    responses: {
                        200: { description: 'Request accepted (transfer executed) or declined' },
                        400: { description: 'Already responded / insufficient balance' },
                        403: { description: 'Not the recipient of this request' },
                    },
                },
            },
            '/api/transfer/history': {
                get: {
                    tags: ['Transfer'],
                    summary: 'Get transaction history (paginated)',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
                        { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } },
                        { name: 'type', in: 'query', schema: { type: 'string', enum: ['sent', 'received', 'requests'] }, description: 'Filter by direction/type' },
                    ],
                    responses: { 200: { description: 'Paginated list with counterparty info' } },
                },
            },
            '/api/transfer/{transactionId}': {
                get: {
                    tags: ['Transfer'],
                    summary: 'Get a single transaction with ledger entries',
                    security: [{ bearerAuth: [] }],
                    parameters: [{ name: 'transactionId', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
                    responses: {
                        200: { description: 'Transaction + ledger entries' },
                        403: { description: 'Not a participant' },
                        404: { description: 'Not found' },
                    },
                },
            },

            // ═══════════════ WALLET ═══════════════
            '/api/wallet/balance': {
                get: {
                    tags: ['Wallet'],
                    summary: 'Get current wallet balance',
                    security: [{ bearerAuth: [] }],
                    responses: { 200: { description: 'Balance (raw cents + formatted)' } },
                },
            },
            '/api/wallet/statement': {
                get: {
                    tags: ['Wallet'],
                    summary: 'Get wallet statement (ledger entries, paginated)',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
                        { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } },
                    ],
                    responses: { 200: { description: 'Paginated ledger entries with transaction details' } },
                },
            },

            // ═══════════════ USERS ═══════════════
            '/api/users/search': {
                get: {
                    tags: ['Users'],
                    summary: 'Search users by cashtag or name',
                    security: [{ bearerAuth: [] }],
                    parameters: [{ name: 'q', in: 'query', required: true, schema: { type: 'string' }, description: 'Search term (cashtag or name)' }],
                    responses: { 200: { description: 'Array of { id, full_name, cashtag, avatar_url }' } },
                },
            },
            '/api/users/{cashtag}': {
                get: {
                    tags: ['Users'],
                    summary: 'Get public user profile by cashtag',
                    security: [{ bearerAuth: [] }],
                    parameters: [{ name: 'cashtag', in: 'path', required: true, schema: { type: 'string' }, example: '$alice' }],
                    responses: {
                        200: { description: 'Public profile (name, cashtag, avatar)' },
                        404: { description: 'User not found' },
                    },
                },
            },
            '/api/users/profile': {
                patch: {
                    tags: ['Users'],
                    summary: 'Update your profile (name, avatar)',
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        fullName: { type: 'string', example: 'Jane Doe' },
                                        avatarUrl: { type: 'string', example: 'https://example.com/avatar.png' },
                                    },
                                }
                            }
                        },
                    },
                    responses: { 200: { description: 'Updated user object' } },
                },
            },
            '/api/users/password': {
                patch: {
                    tags: ['Users'],
                    summary: 'Change password',
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['currentPassword', 'newPassword'],
                                    properties: {
                                        currentPassword: { type: 'string' },
                                        newPassword: { type: 'string', minLength: 6 },
                                    },
                                }
                            }
                        },
                    },
                    responses: {
                        200: { description: 'Password changed' },
                        401: { description: 'Current password incorrect' },
                    },
                },
            },

            // ═══════════════ NOTIFICATIONS ═══════════════
            '/api/notifications': {
                get: {
                    tags: ['Notifications'],
                    summary: 'Get notifications (paginated, includes unread count)',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
                        { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } },
                    ],
                    responses: { 200: { description: 'Notifications + unreadCount + pagination' } },
                },
            },
            '/api/notifications/{id}/read': {
                patch: {
                    tags: ['Notifications'],
                    summary: 'Mark a single notification as read',
                    security: [{ bearerAuth: [] }],
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
                    responses: {
                        200: { description: 'Notification marked as read' },
                        404: { description: 'Not found' },
                    },
                },
            },
            '/api/notifications/read-all': {
                patch: {
                    tags: ['Notifications'],
                    summary: 'Mark all notifications as read',
                    security: [{ bearerAuth: [] }],
                    responses: { 200: { description: 'Count of notifications marked' } },
                },
            },
        },
    },
    apis: [], // We defined paths inline above
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
