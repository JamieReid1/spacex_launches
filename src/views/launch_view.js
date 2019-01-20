const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');


const LaunchView = function(container, launch) {
  this.launchContainer = container;
  this.launch = launch;
};


LaunchView.prototype.render = function () {
  this.createH3Element(`Mission Name: ${this.launch.mission_name}`);
  this.createH3Element(`Launch Year: ${this.launch.launch_year}`);

};

LaunchView.prototype.createH3Element = function (text) {
  const headingH3 = document.createElement('h3');
  headingH3.textContent = text;
  this.launchContainer.appendChild(headingH3);
};

LaunchView.prototype.createPElement = function (text) {
  const p = document.createElement('p');
  p.textContent = text;
  this.launchContainer.appendChild(p);
};

LaunchView.prototype.createALinkElement = function (text, link) {
  const a = document.createElement('a');
  a.setAttribute('href', link)
  a.textContent = text;
  this.launchContainer.appendChild(a);
};

LaunchView.prototype.createUlElement = function () {
  const list = document.createElement('ul');
  this.launchContainer.appendChild(list);
  return list;
};

LaunchView.prototype.createLiElement = function (text, ul) {
  const listItem = document.createElement('li');
  listItem.textContent = text;
  ul.appendChild(listItem);
};

LaunchView.prototype.createGoogleMapsLink = function (launchSite) {
  const link = launchSite.split('').join('+');
  return link;
};


module.exports = LaunchView;
