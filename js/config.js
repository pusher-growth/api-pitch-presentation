var CONFIG = {
  pitchers: {
    leggetter: {
      name: 'Phil @leggetter',
      title: 'Head of Devangelsim',
    },
    ham: {
      name: 'Hamilton',
      title: 'Growth Engineer'
    },
    jam: {
      name: 'Jamie',
      title: 'Growth Engineer'
    }
  },
  
  getPitcher: function() {
    return this.pitchers[this.pitching];
  },
  
  // Change presentation config here:
  pitching: 'jam',
  
  pitchAppUrl: 'http://localhost:8000',
  
  prize: 'Something AWESOME'
};
