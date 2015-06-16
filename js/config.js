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
    },
    vivan: {
      name: 'Vivan',
      title: 'Platform Engineer',
      twitter_id: '@vivangkumar'
    }
  },

  getPitcher: function() {
    return this.pitchers[this.pitching];
  },

  // Change presentation config here:
  pitching: 'vivan',

  pitchAppUrl: 'http://j.mp/bh-berlin',

  prize: 'Best use of Pusher: Ollies'
};
