const Launches = require('./models/launches.js');


document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const launches = new Launches();
  launches.bindEvents();

});
