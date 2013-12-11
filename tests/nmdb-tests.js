/*global it, describe, require, expect*/

var proxyquire = require('proxyquire'),
    chai = require('chai'),
    expect = chai.expect,
    _ = require('lodash-node');

describe('NMDB tests', function() {

  // Uncomment the code below if you want to debug tests with Node Inspector
  // beforeEach(function(done) {
  //   //start mocha as
  //   //mocha -t 11000 --debug
  //   setTimeout(function() {
  //     done();
  //   }, 10000);
  // });

  it('no connection to the database', function() {

    var testIndex = 0;

    var sql = {
      connect: function(config, callback) {
        var err;
        if (config.username !== 'testUsername' ||
          config.password !== 'testPassword' ||
          config.server !== 'testServer' ||
          config.database != 'testDatabase') {
          err = 'No Connection';
        }
        callback(err);
      }
    };

    var nmdb =  proxyquire('../libs/nmdb', { 'mssql': sql });

    var testCases = [
      { user: undefined, password: undefined, server: undefined, database: undefined },
      { user: 'testUsername', password: undefined, server: undefined, database: undefined },
      { user: 'testUsername', password: 'testPassword', server: undefined, database: undefined },
      { user: 'testUsername', password: 'testPassword', server: 'testServer', database: undefined }
    ];

    _.each(testCases, function(options) {
      nmdb(options).query({
        query: 'some query',
        onError: function(err) {
          expect(err).to.equal('No Connection');
          testIndex = testIndex + 1;
        }
      });
    });

    expect(testIndex).to.equal(testCases.length);
  });
});