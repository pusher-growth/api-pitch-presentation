---

class: code, top, code-reveal

## Trigger Events
--

```js
var Pusher = require('pusher');
```
--
```js
var pusher = new Pusher({appId: ID, key: KEY, secret: SECRET});
```
--
```js
pusher.trigger('channel-name', 'event-name', {msg: 'Hello'});
```

---
class: code, top, code-reveal

## Subscribe & Bind to Events
--

```js
<script src="//js.pusher.com/2.2/pusher.min.js"></script>
```
--
```js
<script>
var pusher = new Pusher(KEY);
```
--
```js
var channel = pusher.subscribe('channel-name');
```
--
```js
channel.bind('event-name', function(data) {
  ```
  --
  ```js
  document.body.innerText = data.msg;
  });
  </script>
  ```
