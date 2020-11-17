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
    "endpoint": " https://fcm.googleapis.com/fcm/send/cVX1uYE5sYM:APA91bG_DYnfF7nEvR5QH68OB1wn1YKyco8A5v6sFaOR3Op5GL_6BV_JxSP4KROCaSCayVWX_UikD9ubyo4kZOfMEguYPwlOax-htMXmyjo91-po_h3h9nOkLzcYe07K3xrYv5azNKK4",
    "keys": {
        "p256dh": "BPHQiyw5T3mwk3DSXNU07NG5ZItO4zNXioEzw0a0d8mxHVzHxw5HLKWnhZ0u8NFZzdHRvChi72ePdXDoTZDCrRM=",
        "auth": "4ODkiiPNQfD9JALDnb/weQ=="
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