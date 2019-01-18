const Launches = require('./models/launches.js');
const SelectView = require('./views/select_view.js');
const FilterView = require('./views/filter_view.js');


document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const filterByElement = document.querySelector('#filter-by');
  const filterBy = new FilterView(filterByElement);
  filterBy.bindEvents();

  const filterElement = document.querySelector('#filter');
  const filter = new SelectView(filterElement);
  filter.bindEvents();

  const launches = new Launches();
  launches.bindEvents();

});
