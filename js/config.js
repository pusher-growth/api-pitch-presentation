var CONFIG = {
  pitchers: {
    leggetter: {
      name: 'Phil @leggetter',
      title: 'Developer Evangelist',
      twitter_id: '@leggetter'
    },
    ham: {
      name: 'Hamilton',
      title: 'Developer',
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
  pitching: 'ham',

  pitchAppUrl: 'http://j.mp/geo-ldn',

  prize: 'Parrot MiniDrones'
};
