(function() {
  var slideshow = remark.create( {
    navigation: {
      scroll: false,
    }
  });
  
  var pitcher = CONFIG.getPitcher();
  jQuery('.pitcher_name').text(pitcher.name);
  jQuery('.pitcher_title').text(pitcher.title);
  jQuery('.pitch_app_url').text(CONFIG.pitchAppUrl);
  jQuery('.prize_description').text(CONFIG.prize);
})();
