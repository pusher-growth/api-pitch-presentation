var Pusher = require('pusher');
var config = require(__dirname + '/config.json');

var pusher = new Pusher(config);

// 1. Navigate
// pusher.trigger('nav', 'page_change', {page_id:'notify'});

// 2. Notification
// pusher.trigger('notifications', 'success', {msg:'Hello SimpleWeb Hack!'});

// 3. Get Twitter ID
// pusher.trigger('nav', 'page_change', {page_id:'twitter'}); 

// 4. After the presence demo, send to API Pitch
// pusher.trigger('nav', 'page_change', {page_id:'pitch'});
