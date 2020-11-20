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
    "endpoint": "https://fcm.googleapis.com/fcm/send/f1PyQyQEE1A:APA91bGEzWXiJZyOudA7JnTx3FQxWG3ueGYZZ5m_J_rSCwiAu_wtATb8KRb13E4WJa4RKiPFOFGSlFOgfq2Ux052jhLLLMSKRIrandCDwqNJgGNfoutFy7VACs9ssTUCOJg9PE0BhDW5",
    "keys": {
        "p256dh": "BEl2fcD7Naazf2mBl4fj7y6wHih0qzXPOvphouTn+Go+Zh8jrLUYYtPKI3oyQ1BupkYmaocThsKHzH7znaE232I=",
        "auth": " nJYoAg92A7WDaAVJbV9rhg=="
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