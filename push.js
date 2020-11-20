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
    "endpoint": "https://fcm.googleapis.com/fcm/send/dQtSkMW1uk4:APA91bHxFNRLkC7L1Y7JwDBG7JC3ZxxB3iu-wytopeKa3rHAajZ0bv1HiKzphZ18jEP_z4tH9QOZI8aztUcOG1XsXZeKpf1jlyLhRiQJ9fUzcR8xyc378q-1d45mrtWf9FODd8kRzYtU",
    "keys": {
        "p256dh": "BEQ8diiWBMwYe/IICDh1Lg6VGt99neleeOle1WXZKcVFyd9rkzPttO6Z5XGsDZPaXiYv78+7KSpFynE635hK4qY=",
        "auth": "crh8DmG12sqdenXrX8FTfA=="
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