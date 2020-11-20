var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BO9npubEklfrA9hveIedFhvU7ckCFhiUB4m4g-JVKbdL9cJWICugzm5dsJb2h9aY8BSK37UnCD4SC_u-VqA8i4s",
    "privateKey": "6HLDy81cdNv2uYLgb0h2_zmd5Vs-DIoTDA3b7UJZq1M"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "  https://fcm.googleapis.com/fcm/send/c6zBsgXoY00:APA91bH1Z-yYdBE_t8cWZLKietQlnhEtL4Qg3U3uVPB2QV9Fl8H12LPDg2FBp4QGHZtajnHyB8DqnZb8YBz0vuxcHmE6Kv10wWGaeutslP2WN2wKaq3yxO9BpNbnH8w08mEx0tPw9i_E",
    "keys": {
        "p256dh": "BPNIH6/LkakV/lA4TG/TKqrTHWyaqQdFW3FW8g9L0wfBn+mR9FA4qKtZcqmBu25FYHyhymwNYXSzCNZlkrjvDTA=",
        "auth": "5TsjMb2tFh5STa/P39seBQ=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '874154568789',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);