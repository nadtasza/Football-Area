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
    "endpoint": "https://fcm.googleapis.com/fcm/send/e42rfNsS7e8:APA91bGHkYYczdr5-auCo610Gu9ekbMknx-AOT8f9wwLCXeYlsYc63oZvR3x_QgPDRpY-GAp4KXlTgm9VFP4oAuKxfzj2AW5NEUY2UcivpzFzOhE5jdjsqBQkx9pglPcQiGh814H8Gqz",
    "keys": {
        "p256dh": "BAFisu8g/mlTpBTzJrki9oQvihUWEPevmIkxmahbBzTTnc+DdhdmSczeG4P9IQX96NtxBrbCZy64PmiBk9N/pEo=",
        "auth": "YB4kEdWHInnp2WLC73tymg=="
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