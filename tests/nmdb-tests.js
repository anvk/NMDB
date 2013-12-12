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

  it('query() function tests', function() {
    expect(true).to.equal(true);
  });

  it('call() function building query string tests', function() {

    var nmdb = proxyquire('../libs/nmdb', { 'mssql': {} }),
        dataLayer = nmdb(),
        testIndex = 0,
        testQuery;

    dataLayer.query = function(options) {
      expect(options.query).to.equal(testQuery);
      testIndex = testIndex + 1;
    };

    var testCases = [
      { input: { storProcName: undefined, args: undefined }, testQuery: undefined },
      { input: { storProcName: 'myproc', args: undefined }, testQuery: 'EXEC [dbo].[myproc]' },
      { input: { storProcName: 'myproc', args: {} }, testQuery: 'EXEC [dbo].[myproc]' },
      { input: { storProcName: 'myproc', args: { a: '5', b: 1, c: true, e: null, d: undefined, f: 1.1, g: 0.1} }, testQuery: 'EXEC [dbo].[myproc] @a=\'5\',@b=1,@c=true,@e=null,@f=1.1,@g=0.1' },
      { input: { storProcName: 'myproc', args: { a: {} } }, testQuery: 'EXEC [dbo].[myproc] @a=[object Object]' },
      { input: { storProcName: 'myproc', args: { a: '\'\"+_&' } }, testQuery: 'EXEC [dbo].[myproc] @a=\'&#39;&quot;+_&amp;\'' }
    ];

    _.each(testCases, function(testCase) {
      testQuery = testCase.testQuery;
      dataLayer.call(testCase.input);
    });

    expect(testIndex).to.equal(testCases.length - 1); // first test never reaches query() function
  });
});