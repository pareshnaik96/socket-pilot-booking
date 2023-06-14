const Pusher = require('pusher');

const pusher = new Pusher({
    appId: '1605653',
    key: '61af8db6181008703758',
    secret: 'a63338d1b1a46ee8b40b',
    cluster: 'ap2',
    useTLS: true
});

module.exports = pusher



