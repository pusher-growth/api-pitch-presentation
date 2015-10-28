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
    },
    jack: {
      name: 'Jack',
      title: 'Developer Evangelist',
      twitter_id: '@Jack_Franklin'
    },
  },

  getPitcher: function() {
    return this.pitchers[this.pitching];
  },

  // Change presentation config here:
  pitching: 'jack',

  pitchAppUrl: 'http://j.mp/yoyo-ldn',

  prize: 'Parrot MiniDrones'
};
