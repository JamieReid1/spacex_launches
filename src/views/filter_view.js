const PubSub = require('../helpers/pub_sub.js');


const FilterView = function(element) {
this.element = element;
};


FilterView.prototype.bindEvents = function () {
  this.element.addEventListener('change', (event) => {
    const launchList = document.querySelector('#launch-list');
    launchList.innerHTML = '';
    PubSub.publish('FilterView:change', event.target.value);
  });
};


module.exports = FilterView;
