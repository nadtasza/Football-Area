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
    "endpoint": "https://fcm.googleapis.com/fcm/send/eD7ZYI0DH3g:APA91bFSqh_qFuNZvE1W1pzLUxXHfIVCneH66uaMDXTiaIwVJy4Hu-wkPZezoXJYn28DmPvu-vaxADxFxatxkNyMx2F9lGPSewId7S86V9CPC1tG_GYgr9naRAZWNx_bTt4bAIvN-NnH",
    "keys": {
        "p256dh": "BOle+bppp0tNIdJH5Q8wqb9txlN9D5YqHEvSkdgVLGMjWLAJeXKec8EvKFq7qa8iGXKDIO+UWyBg44I/u5WKO7w=",
        "auth": " 7+anej1uaINXplQlJqMJMw=="
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