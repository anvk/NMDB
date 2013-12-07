/*global require*/

var nmdb = require('./lib/nmdb'),
    config = require('../config/dataProvider.json');

var dataLayer = nmdb(config);

dataLayer.query({
  query: 'select 1;',
  onSuccess: function(data) {
    console.log(data);
  }
});

dataLayer.call({
  storProcName: 'getCustomerID',
  args: {
    firstName: 'Alex',
    lastName: 'Novak'
  },
  onSuccess: function(data) {
    console.log(data);
  }
});