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
  var usersOnline = pusher.subscribe('presence-user-count');
  
  function updateUserCount() {
    // debugger;
    var count = usersOnline.members.count;
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
  
  var pitchingEl = jQuery('#presence_pitchers');
  
  var pitchingChannel = pusher.subscribe('presence-pitch');
  pitchingChannel.bind('pusher:subscription_succeeded', function(members) {
    members.each(addPitcher);
  });
  pitchingChannel.bind('pusher:member_added', addPitcher);
  pitchingChannel.bind('pusher:member_removed', removePitcher);
  
  function addPitcher(pitcher) {
    console.log(pitcher);
    if(!pitcher.info.twitter_id) {
      return;
    }
    
    var pitcherEl = jQuery('<div class="ball pitcher pitcher_' + pitcher.info.twitter_id + '"><span class="mph"></span></div>');
    pitcherEl.attr('title', pitcher.info.twitter_id);
    var url = 'http://avatars.io/twitter/' + pitcher.info.twitter_id;
    pitcherEl.css('background-image', 'url(' + url + ')');
    pitchingEl.append(pitcherEl);
  }
  
  function removePitcher(pitcher) {
    var pitcherEl = jQuery('.pitcher_' + pitcher.info.twitter_id);
    pitcherEl.remove();
  }
  
  pitchingChannel.bind('client-pitched', function(ev) {
    var pitcherEl = jQuery('.pitcher_' + ev.twitter_id);
    var px = (ev.mph*1.5) + 'px';
    pitcherEl.animate({width: px, height: px, 'z-index': ev.mph});
    pitcherEl.find('.mph').text(ev.mph);
  })
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
