const PubSub = require('../helpers/pub_sub.js');


const SelectView = function(element) {
this.element = element;
};


let allLaunches;

SelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Launches:launch-data-loaded', (event) => {
    allLaunches = event.detail;
  });
  PubSub.subscribe('FilterView:filter-by', (event) => {
    const property = event.detail;
    this.populate(property);
  });
};

SelectView.prototype.populate = function (property) {
  this.element.innerHTML = '';
  if (property === 'Flight No.') {
    const flightNos = allLaunches.map(launch => launch.flight_number);
    flightNos.forEach((flightNo, index) => {
      const option = document.createElement('option');
      option.textContent = flightNo;
      option.value = index;
      this.element.appendChild(option);
    });
  } else if (property === 'Launch Year') {
    const launchYears = allLaunches.map(launch => launch.launch_year);
    const uniqueLaunchYears = Array.from(new Set(launchYears));
    uniqueLaunchYears.forEach((launchYear, index) => {
      const option = document.createElement('option');
      option.textContent = launchYear;
      option.value = index;
      this.element.appendChild(option);
    });
  } else if (property === 'Launch Site') {
    const launchSites = allLaunches.map(launch => launch.launch_site.site_name_long);
    const uniqueLaunchSites = Array.from(new Set(launchSites)).sort();
    uniqueLaunchSites.forEach((launchSite, index) => {
      const option = document.createElement('option');
      option.textContent = launchSite;
      option.value = index;
      this.element.appendChild(option);
    });
  } else if (property === 'Payload Type') {
    const payloadTypes = allLaunches.map(launch => launch.rocket.second_stage.payloads[0].payload_type);
    const uniquePayloadTypes = Array.from(new Set(payloadTypes)).sort();
    uniquePayloadTypes.forEach((payload, index) => {
      const option = document.createElement('option');
      option.textContent = payload;
      option.value = index;
      this.element.appendChild(option);
    });
  } else if (property === 'Customer') {
    const customers = allLaunches.map(launch => launch.rocket.second_stage.payloads[0].customers);
    const allCustomers = [].concat.apply([], customers);
    const uniqueCustomers = Array.from(new Set(allCustomers)).sort();
    uniqueCustomers.forEach((customer, index) => {
      const option = document.createElement('option');
      option.textContent = customer;
      option.value = index;
      this.element.appendChild(option);
    });
  }
};


module.exports = SelectView;
