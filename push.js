var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BIVBI2jlR496LYm9SfK_nY-OlJsRqbwySWGRTlUN59tdBfDJISSHBA9zhztSWuwhSoRlZ0N7d3dAJZvyAFjuS4Y",
    "privateKey": "fc-VsyWqxKsrvtRIt0RXUrdYS7lYcyWkE51r6J0LS-k"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": " https://fcm.googleapis.com/fcm/send/eOSTHKt7NLE:APA91bHe5bD1BuTlD5pkV6qxwgo12_7KtIxFC_kVksH955_g3lXKBI8Fmw7A8DX3Fx1YE6zqrTps37nnjRyB1zLXdpWIi5DPF8tvQRfjLgqpyFTHlOzG73ksNyw23N6Xi0tkyuHEdTyH",
    "keys": {
        "p256dh": "BGVYAwvCEjPeDTCuL1mH7B8xjDT9tO32gWmVMdlI5WuCmR7aI2quNc4s4cCzlmGD9qPUlbAdq/gG8ChU6xxWReM=",
        "auth": "Eg+S3+Itnjpl4F0/e5pbUw=="
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