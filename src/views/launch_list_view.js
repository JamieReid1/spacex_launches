const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');
const LaunchView = require('./launch_view.js');


const LaunchListView = function(container) {
  this.container = container;
};


let launches;

LaunchListView.prototype.bindEvents = function () {
  let value;
  PubSub.subscribe('Launches:launch-data-loaded', (event) => {
    launches = event.detail;
  })
  PubSub.subscribe('SelectView:change', (event) => {
    value = event.detail.target.value;
    this.render(launches, value)
  });
};

LaunchListView.prototype.render = function (launches, value) {
  this.container.innerHTML = '';
  launches.forEach(launch => {
    if (launch.flight_number == value) {
      const selectedLaunch = new LaunchView(this.container, launch);
      selectedLaunch.render();
    } else if (launch.launch_year === value) {
      const selectedLaunch = new LaunchView(this.container, launch);
      selectedLaunch.render();
    };
  });
};


module.exports = LaunchListView;
