var CONFIG = {
  pitchers: {
    leggetter: {
      name: 'Phil @leggetter',
      title: 'Developer Evangelist',
      twitter_id: '@leggetter'
    },
    ham: {
      name: 'Hamilton',
      title: 'Growth Engineer',
      twitter_id: '@hamchapman'
    },
    jam: {
      name: 'Jamie',
      title: 'Developer',
      twitter_id: '@JamiePatel'
    }
  },
  
  getPitcher: function() {
    return this.pitchers[this.pitching];
  },
  
  // Change presentation config here:
  pitching: 'leggetter',
  
  pitchAppUrl: 'j.mp/yoyo-tokyo',
  
  prize: 'Best use of Pusher: GoPros'
};
