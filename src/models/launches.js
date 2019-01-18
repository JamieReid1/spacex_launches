const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');


const Launches = function() {
    this.data = [];
};


Launches.prototype.bindEvents = function () {
  this.getData();
};

Launches.prototype.getData = function () {
  const url = 'https://api.spacexdata.com/v3/launches';
  const request = new RequestHelper(url);
  const myPromise = request.get();
  myPromise.then((data) => {
    this.data = data;
    PubSub.publish('Launches:launch-data-loaded', this.data);
    console.dir(this.data);
  })
  .catch((error) => {
    console.error(error);
  })
};



module.exports = Launches;
