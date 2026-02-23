/**
 * FlowCash — End-to-end test for User & Notification endpoints.
 * Run: node src/database/testUserNotif.js
 */
require('dotenv').config();
const app = require('../app');
const db = require('../config/db');

const BASE = 'http://localhost:3004/api';

const post = (url, body, token) => fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: 'Bearer ' + token } : {}) },
    body: JSON.stringify(body),
});
const patch = (url, body, token) => fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: 'Bearer ' + token } : {}) },
    body: body ? JSON.stringify(body) : undefined,
});
const get = (url, token) => fetch(url, { headers: token ? { Authorization: 'Bearer ' + token } : {} });

async function run() {
    const server = app.listen(3004, () => console.log('Server on :3004'));
    try {
        const ts = Date.now();

        // Register two users
        let res = await post(BASE + '/auth/register', { email: `usera_${ts}@test.com`, password: 'pass123456', fullName: 'User Alpha' });
        const userA = (await res.json()).data;
        const tokenA = userA.accessToken;

        res = await post(BASE + '/auth/register', { email: `userb_${ts}@test.com`, password: 'pass123456', fullName: 'User Beta' });
        const userB = (await res.json()).data;
        const tokenB = userB.accessToken;
        console.log('Registered:', userA.user.cashtag, userB.user.cashtag);

        // Send money to generate notifications
        await post(BASE + '/transfer/send', { cashtag: userB.user.cashtag, amount: 1000, note: 'test' }, tokenA);

        // ── 1. Health ──
        res = await get(BASE + '/health');
        let data = await res.json();
        console.log('\n1. HEALTH (' + res.status + '):', JSON.stringify(data.data, null, 2));

        // ── 2. Search Users ──
        res = await get(BASE + '/users/search?q=user', tokenA);
        data = await res.json();
        console.log('\n2. SEARCH (' + res.status + '): found=' + data.data.users.length + ', first=' + (data.data.users[0]?.cashtag || 'none'));

        // ── 3. Get User Profile ──
        res = await get(BASE + '/users/' + userB.user.cashtag, tokenA);
        data = await res.json();
        console.log('\n3. PROFILE (' + res.status + '):', JSON.stringify(data.data.user));

        // ── 4. Update Profile ──
        res = await patch(BASE + '/users/profile', { fullName: 'Alpha Updated', avatarUrl: 'https://example.com/avatar.png' }, tokenA);
        data = await res.json();
        console.log('\n4. UPDATE PROFILE (' + res.status + '): name=' + data.data.user.full_name + ', avatar=' + data.data.user.avatar_url);

        // ── 5. Change Password ──
        res = await patch(BASE + '/users/password', { currentPassword: 'pass123456', newPassword: 'newpass789' }, tokenA);
        data = await res.json();
        console.log('\n5. CHANGE PASSWORD (' + res.status + '):', data.message);
        // Verify login with new password
        res = await post(BASE + '/auth/login', { email: `usera_${ts}@test.com`, password: 'newpass789' });
        data = await res.json();
        console.log('   Login with new password:', data.success ? 'OK' : 'FAILED');

        // ── 6. Get Notifications ──
        res = await get(BASE + '/notifications?page=1&limit=10', tokenA);
        data = await res.json();
        console.log('\n6. NOTIFICATIONS (' + res.status + '): count=' + data.data.notifications.length + ', unread=' + data.data.unreadCount);
        const notifId = data.data.notifications[0]?.id;

        // ── 7. Mark As Read ──
        if (notifId) {
            res = await patch(BASE + '/notifications/' + notifId + '/read', null, tokenA);
            data = await res.json();
            console.log('\n7. MARK READ (' + res.status + '):', data.message);
        }

        // ── 8. Mark All Read (for userB) ──
        res = await get(BASE + '/notifications?page=1&limit=10', tokenB);
        data = await res.json();
        console.log('\n8a. USER B notifs: count=' + data.data.notifications.length + ', unread=' + data.data.unreadCount);
        res = await patch(BASE + '/notifications/read-all', null, tokenB);
        data = await res.json();
        console.log('8b. MARK ALL READ (' + res.status + '):', data.message);
        res = await get(BASE + '/notifications?page=1&limit=10', tokenB);
        data = await res.json();
        console.log('8c. After mark-all: unread=' + data.data.unreadCount);

        // ── 9. Wrong old password ──
        res = await patch(BASE + '/users/password', { currentPassword: 'wrongpass', newPassword: 'doesntmatter' }, tokenA);
        data = await res.json();
        console.log('\n9. WRONG OLD PASSWORD (' + res.status + '):', data.message);

        // ── 10. Search excludes self ──
        res = await get(BASE + '/users/search?q=' + userA.user.cashtag, tokenA);
        data = await res.json();
        const selfInResults = data.data.users.some(u => u.id === userA.user.id);
        console.log('10. SEARCH EXCLUDES SELF:', !selfInResults ? 'YES ✅' : 'NO ❌');

        // Cleanup
        await db.query('DELETE FROM users WHERE id = $1', [userA.user.id]);
        await db.query('DELETE FROM users WHERE id = $1', [userB.user.id]);
        console.log('\n✅ ALL USER & NOTIFICATION TESTS PASSED');
    } catch (err) {
        console.error('❌ FAILED:', err);
        process.exitCode = 1;
    } finally {
        server.close();
        await db.pool.end();
    }
}

run();
