const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');


const LaunchView = function(container, launch) {
  this.launchContainer = container;
  this.launch = launch;
};


let launchContainer;

LaunchView.prototype.render = function () {
  launchContainer = document.createElement('div');
  launchContainer.setAttribute('class', 'launch');
  this.createImgElement(`${this.launch.links.mission_patch}`, 200, 200);
  this.createH3Element(`Mission Name: ${this.launch.mission_name}`);
  this.createH3Element(`Rocket Name: ${this.launch.rocket.rocket_name}`);
  this.createH3Element(`Rocket Type: ${this.launch.rocket.rocket_type}`);
  this.createH3Element(`Payloads:`);
  const payloadList = this.createDivElement('payload-list');
  launchContainer.appendChild(payloadList);
  this.launch.rocket.second_stage.payloads.forEach(payload => {
    const payloadUl = this.createUlElement();
    const customersArr = [].concat.apply([], payload.customers);
    this.createLiElement(`Customers: ${customersArr}`, payloadUl);
    this.createLiElement(`Manufacturer: ${payload.manufacturer}`, payloadUl);
    this.createLiElement(`Nationality: ${payload.nationality}`, payloadUl);
    this.createLiElement(`Orbit: ${payload.orbit}`, payloadUl);
    this.createLiElement(`Mass: ${payload.payload_mass_kg} kg`, payloadUl);
    this.createLiElement(`Type: ${payload.payload_type}`, payloadUl);
    payloadList.appendChild(payloadUl);
  });
  this.createH3Element(`Launch Date Time: ${this.convertDateTime(this.launch.launch_date_local)}`);
  this.createH3Element(`Launch Site: ${this.launch.launch_site.site_name_long}`);
  if (this.launch.launch_success === true) {
    const outcome = this.createH3Element('Launch Successful');
  } else if (this.launch.launch_success === false) {
    const outcome = this.createH3Element('Launch Failure');
  } else if (this.launch.launch_success === null) {
    const outcome = this.createH3Element('Unknown Outcome');
  };
  this.createH4Element('Details:')
  if (this.launch.details) {
    this.createPElement(this.launch.details);
  } else if (!this.launch.details) {
    this.createPElement('Unknown');
  };
  if (this.launch.links.video_link) {
    const launchVideo = this.createALinkElement('Launch Video', this.launch.links.video_link);
  }
};

LaunchView.prototype.createH3Element = function (text) {
  const headingH3 = document.createElement('h3');
  headingH3.textContent = text;
  launchContainer.appendChild(headingH3)
  this.launchContainer.appendChild(launchContainer);
};

LaunchView.prototype.createH4Element = function (text) {
  const headingH4 = document.createElement('h4');
  headingH4.textContent = text;
  launchContainer.appendChild(headingH4)
  this.launchContainer.appendChild(launchContainer);
};

LaunchView.prototype.createPElement = function (text) {
  const p = document.createElement('p');
  p.textContent = text;
  launchContainer.appendChild(p);
  this.launchContainer.appendChild(launchContainer);
};

LaunchView.prototype.createALinkElement = function (text, link) {
  const a = document.createElement('a');
  a.setAttribute('href', link)
  a.textContent = text;
  launchContainer.appendChild(a);
  this.launchContainer.appendChild(launchContainer);
};

LaunchView.prototype.createUlElement = function () {
  const list = document.createElement('ul');
  launchContainer.appendChild(list);
  this.launchContainer.appendChild(launchContainer);
  return list;
};

LaunchView.prototype.createLiElement = function (text, ul) {
  const listItem = document.createElement('li');
  listItem.textContent = text;
  ul.appendChild(listItem);
};

LaunchView.prototype.createGoogleMapsLink = function (launchSite) {
  const link = launchSite.split(' ').join('+');
  return `https://www.google.com/maps/place/${link}/@27.1981565,-82.1249988,7.04z/data=!4m5!3m4!1s0x88e0a4e74e6a8abb:0x2a16683cb4a44f!8m2!3d28.4886723!4d-80.5728241`
};

LaunchView.prototype.createImgElement = function (url, height, width) {
  const image = document.createElement('img');
  image.setAttribute('src', url);
  image.setAttribute('height', `${height}`);
  image.setAttribute('width', `${width}`);
  launchContainer.appendChild(image);
  this.launchContainer.appendChild(launchContainer);
};

LaunchView.prototype.createDivElement = function (id) {
  const div = document.createElement('div');
  div.setAttribute('id', id);
  return div;
};

LaunchView.prototype.convertDateTime = function (dateTime) {
  const launchDateTime = dateTime;
  const date = launchDateTime.split('T', 1);
  const dateShow = date.join().split('-').reverse().join('/');
  const time = launchDateTime.split('+', 5);
  const timeSplit = time[0].split('T', 8);
  const timeShow = timeSplit[1];
  return `${dateShow} ${timeShow}`;
};


module.exports = LaunchView;
