const PubSub = require('../helpers/pub_sub.js');


const FilterView = function(element) {
this.element = element;
};


FilterView.prototype.bindEvents = function () {
  this.element.addEventListener('change', (event) => {
    PubSub.publish('FilterView:filter-by', event.target.value);
  });
};


module.exports = FilterView;
