# Pusher API Pitch Presentation

## Main Goal of Pitch

* Excite
* Inspire ideas
* Demonstrate ease & simplicity

## How

* Brief overview of Pusher
* Examples of use cases
* Demos with code

## Script

Here's the basic script to follow. But feel free to make it your own.

### Prep

* Update API Pitch Presentation `js/config.js`
  1. Your Details
  2. A short link to the API Pitch App
* Have your terminal cd'd to the location you are going to execute the server example
* Have your editor open with all files closed
* Ensure the configuration for the pitch is set up in the appropriate language config file
* Run the slides from localhost using some local server script
* Run the API Pitch app in a window so you can check it's working

### The Pitch

#### Intro & What is Pusher

Keep it brief, but ensure you explain how Pusher works and integrates with any tech stack.

#### Quickly go through use cases

#### Quickly say what Code & Demos that will be covered

#### Get as many people as possible to go to the URL

When a reasonable number is show in the slide, progress with the talk.

*TODO: have API Pitch URL persistently visible in app*

#### Trigger From Server Demo

* Create new file - demo.js
* Include pusher package
  * Node: `var Pusher = require('pusher');`
  * Ruby: require 'pusher'
  * Python: `import pusher`
* Get config and explain you get this after you signup
  * Node: `var config = require(__dirname + '/config.json');`
* Initialise Pusher
  * Node: `var pusher = new Pusher(config);`
* Trigger:
  * Explain triggering events on channels
  * What are channels and what are events.
  * Say we're triggering a `page_changed` event on `nav` channel to tell their app to change page
  * The payload of the event is `{page_id: 'notify'}` to send them to the `notify` page
    * Node: `pusher.trigger('nav', 'page_changed', {page_id: 'notify'});`
* Trigger Notification
  * A simple use case demo
  * Node: `pusher.trigger('notifications', 'success', {msg:'Event Specific Text'});`

#### Receiving notifications: subscribing & binding

* In presentation click the "demo" button
* Talk through code
  * Connect
  * Subscribe
  * Event called `user` to identify the notification is from a user and `data.msg` is the notification text

```js
// Connect using ddf4525af004daf4ba2a
var pusher = new Pusher('ddf4525af004daf4ba2a');

// Subscribe to "notifications" channel
var channel = pusher.subscribe('notifications');

// Bind to "user" event
channel.bind('user', function(data) {
  // Show notification
  toastr.warning(data.msg, '', {"positionClass": "toast-top-full-width"});
});
```

* Click `Run` to execute the code

#### Highlight Client Events are possible but there are constraints

* Need a way of identifying if a client can be trusted
* We have simple sample code to help
* And we're here to help

#### Live User Lists (Presence) - talk through code

* Run the example
* Users should be able to toggle online/offline

#### The API Pitch - Now their turn. Click "Start Pitching"

#### What's the Prize? Criteria for Prize? Sign up!
