const PubSub = require('../helpers/pub_sub.js');


const SelectView = function(element) {
this.element = element;
};


let allLaunches;

SelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Launches:launch-data-loaded', (event) => {
    allLaunches = event.detail;
  });
  PubSub.subscribe('FilterView:change', (event) => {
    const property = event.detail;
    this.populate(property);
  });
  this.element.addEventListener('change', (event) => {
    PubSub.publish('SelectView:change', event);
  });
};

SelectView.prototype.populate = function (property) {
  this.element.innerHTML = '';
  if (property === 'Flight No.') {
    const flightNos = allLaunches.map(launch => launch.flight_number);
    flightNos.forEach((flightNo, index) => {
      const option = document.createElement('option');
      option.textContent = flightNo;
      option.value = flightNo;
      this.element.appendChild(option);
    });
  } else if (property === 'Launch Year') {
    const launchYears = allLaunches.map(launch => launch.launch_year);
    const uniqueLaunchYears = Array.from(new Set(launchYears));
    uniqueLaunchYears.forEach((launchYear, index) => {
      const option = document.createElement('option');
      option.textContent = launchYear;
      option.value = launchYear;
      this.element.appendChild(option);
    });
  } else if (property === 'Launch Site') {
    const launchSites = allLaunches.map(launch => launch.launch_site.site_name_long);
    const uniqueLaunchSites = Array.from(new Set(launchSites)).sort();
    uniqueLaunchSites.forEach((launchSite, index) => {
      const option = document.createElement('option');
      option.textContent = launchSite;
      option.value = launchSite;
      this.element.appendChild(option);
    });
  } else if (property === 'Payload Type') {
    const payloads = allLaunches.map(launch => launch.rocket.second_stage.payloads);
    const allPayloads = [].concat.apply([], payloads);
    const payloadTypes = allPayloads.map(payload => payload.payload_type);
    const uniquePayloadTypes = Array.from(new Set(payloadTypes)).sort();
    uniquePayloadTypes.forEach((payload, index) => {
      const option = document.createElement('option');
      option.textContent = payload;
      option.value = payload;
      this.element.appendChild(option);
    });
  } else if (property === 'Customer') {
    const payloads = allLaunches.map(launch => launch.rocket.second_stage.payloads);
    const allPayloads = [].concat.apply([], payloads);
    const customers = allPayloads.map(payload => payload.customers);;
    const allCustomers = [].concat.apply([], customers);
    const uniqueCustomers = Array.from(new Set(allCustomers)).sort();
    uniqueCustomers.forEach((customer, index) => {
      const option = document.createElement('option');
      option.textContent = customer;
      option.value = customer;
      this.element.appendChild(option);
    });
  } else if (property === 'Orbit') {
    const payloads = allLaunches.map(launch => launch.rocket.second_stage.payloads);
    const allPayloads = [].concat.apply([], payloads);
    const orbits = allPayloads.map(payload => payload.orbit);;
    const allOrbits = [].concat.apply([], orbits);
    const uniqueOrbits = Array.from(new Set(allOrbits)).sort();
    uniqueOrbits.forEach((orbit, index) => {
      const option = document.createElement('option');
      option.textContent = orbit;
      option.value = orbit;
      this.element.appendChild(option);
    });
  };
};


module.exports = SelectView;
