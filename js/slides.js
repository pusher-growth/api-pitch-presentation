(function() {
  Pusher.log = function(msg) {
    console.log(msg);
  };
  
  var authEndpoint = 'https://api-pitch-server.herokuapp.com/auth';
  // var authEndpoint = 'http://localhost:5000/auth';
  
  Pusher.channel_auth_endpoint = authEndpoint;
  
  var pusher = new Pusher('ddf4525af004daf4ba2a', {
    encrypted:true,
    authEndpoint: authEndpoint
  });
  
  /* Simple online user count - they have the app open */
  var usersOnline = pusher.subscribe('presence-user-count');
  
  function updateUserCount() {
    // debugger;
    var count = (usersOnline.members.count - 1);
    console.log(count);
    var els = document.querySelectorAll('.online-users-count');
    Array.prototype.forEach.call(els, function(el) {
      el.innerText = count;
    });
  }
  
  usersOnline.bind('pusher:subscription_succeeded', updateUserCount);
  usersOnline.bind('pusher:member_added', updateUserCount);
  usersOnline.bind('pusher:member_removed', updateUserCount);
  
  var privateNavChannel = pusher.subscribe('private-nav');
  
  function privateNav(pageId) {  
    privateNavChannel.trigger('client-page_change', {page_id: pageId});
  }
  
  window.triggerNav = privateNav;
  
  /* Pitching functionality */
  var pitchingEl = jQuery('#presence_pitchers');
  
  var pitchingChannel = pusher.subscribe('presence-pitch');
  pitchingChannel.bind('pusher:subscription_succeeded', function(members) {
    members.each(addPitcher);
  });
  pitchingChannel.bind('pusher:member_added', addPitcher);
  pitchingChannel.bind('pusher:member_removed', removePitcher);
  
  function toSafePitcherId(val) {
    return val.replace(/(\.|<|>)/g, '_');
  }
  
  function addPitcher(pitcher) {
    if(!pitcher.info.twitter_id) {
      return;
    }
    
    var pitcherEl = jQuery('<div class="ball pitcher pitcher_' + toSafePitcherId(pitcher.info.twitter_id) + '"><span class="mph"></span></div>');
    pitcherEl.attr('title', toSafePitcherId(pitcher.info.twitter_id));
    var url = 'http://avatars.io/twitter/' + toSafePitcherId(pitcher.info.twitter_id);
    pitcherEl.css('background-image', 'url(' + url + ')');
    pitchingEl.append(pitcherEl);
  }
  
  function removePitcher(pitcher) {
    var pitcherEl = jQuery('.pitcher_' + toSafePitcherId(pitcher.info.twitter_id));
    pitcherEl.remove();
  }
  
  pitchingChannel.bind('client-pitched', function(ev) {
    var pitcherEl = jQuery('.pitcher_' + toSafePitcherId(ev.twitter_id) );
    var px = (ev.mph*1.5) + 'px';
    pitcherEl.animate({width: px, height: px, 'z-index': ev.mph});
    pitcherEl.find('.mph').text(ev.mph);
  })
  
  /* Count of users who have logged in via Twitter */
  var twitterChannel = pusher.subscribe('presence-users');
  twitterChannel.bind('pusher:subscription_succeeded', updateTwitterCount);
  twitterChannel.bind('pusher:member_added', updateTwitterCount);
  twitterChannel.bind('pusher:member_removed', updateTwitterCount);
  
  function updateTwitterCount() {
    // debugger;
    var count = (twitterChannel.members.count -1 );
    console.log('Twitter users count:', count);
    var els = document.querySelectorAll('.online-twitter-count');
    Array.prototype.forEach.call(els, function(el) {
      el.innerText = count;
    });
  }
  
  /* To trigger notifications from the client */
  var clientNotificationsChannel = pusher.subscribe('private-notifications');
  
  jQuery('.notifications-form').on('keypress', function(e) {
    e.stopImmediatePropagation();
  });
  
  jQuery('.notifications-form').on('submit', function(ev) {
    var formEl = jQuery(ev.target || ev.srcElement);
    var message = formEl.find('*[name="message"]').val().trim();
    if(message) {
      clientNotificationsChannel.trigger('client-success', {msg: message});
    }
    ev.preventDefault();
  });
  
  // To show notifications from pitch app users
  var subscribedToNotifications = false;
  var notificationsChannel;
  jQuery('.notifications-btn').on('click', function(ev) {
    var el = jQuery(ev.target || ev.srcElement);
    
    if(!subscribedToNotifications) {
      notificationsChannel = pusher.subscribe('notifications');
      
      // Bind to "user" event
      notificationsChannel.bind('user', function(data) {
        toastr.warning(data.msg, '', {"positionClass": "toast-bottom-right"});
      });
      
      subscribedToNotifications = true;
    }
    else {
      pusher.unsubscribe('notifications');
      subscribedToNotifications = false;
    }
    
    var btnText = subscribedToNotifications? 'Unsubscribe' : 'Subscribe';
    el.toggleClass('action-unsubscribe');
    el.text(btnText);
    
    triggerNav('notify');
  });
  
})();

(function(){
  // This all needs to be cleaned up.
  var editor = ace.edit("editor");
  editor.setFontSize(24);
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/javascript");
  var editorEl = jQuery('#editor');
  editorEl.hide();
  var editorControlsEl = jQuery('#editor_controls');
  editorControlsEl.hide();
  
  // Stop remarkjs from capturing editor keystrokes
  editorEl.on('keypress', function(e) {
    e.stopImmediatePropagation();
  });

  window.editor = editor;
  window.editorEl = editorEl;
  window.editorControlsEl = editorControlsEl;
})();

function liveUserListsDemo(el) {
  // jQuery(el).hide();
  triggerNav('twitter');
  showDemoCode('#presence_code');
}

function showDemoCode(codeId) {
  var script = jQuery(codeId).text().trim();
  editor.setValue(script);
  editorEl.show();
  editor.focus();
  editor.gotoLine(0, 0, false);
  editor.scrollToLine(0);
  editor.resize(true);
  editorControlsEl.show();
}

function hideEditor() {
  editorEl.hide();
  editorControlsEl.hide();
}

function execute() {
  var code = editor.getValue();
  try {
    // Try to avoid overriding globals
    var codeClosure = '(function() {' + code + '})();';
    eval(codeClosure);
  } catch (err) {
    console.error(err);
  }
  
  hideEditor();
}

function startPitching(el) {
  // jQuery(el).hide();
  triggerNav('pitch');
}
