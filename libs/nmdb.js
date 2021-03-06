/*global require, module*/

var sql = require('mssql'),
    extend = require('node.extend'),
    _ = require('lodash-node');


// options.debug
// options.verbose
// options.parseCallback
// options.dbconfig.user
// options.dbconfig.password
// options.dbconfig.server
// options.dbconfig.database
var dataProvider = function(options) {
  options = options || {};
  var that = {},
      verbose,
      parseCallback,
      onError,
      dbconfig;

  var defaults = {
    dbconfig: {
      user: undefined,
      password: undefined,
      server: undefined,
      database: undefined
    },
    parseCallback: undefined,
    onError: undefined,
    verbose: false
  };

  var init = function(options) {
    options = extend(true, {}, defaults, options);

    verbose = options.verbose;
    parseCallback = options.parseCallback;
    onError = options.onError;
    dbconfig = options.dbconfig;

    return that;
  };

  var wrap = _.wrap(_.escape, function(func, text) {
    return '\'' + func(text) + '\'';
  });

  var log = function(message) {
    console.log('dataProvider -> ' + message);
  };

  // options.query
  // options.onSuccess
  // options.onError
  // options.parseCallback
  // options.verbose
  // options.dbconfig.user
  // options.dbconfig.password
  // options.dbconfig.server
  // options.dbconfig.database
  that.query = function(options) {
    options = options || {};
    var query = options.query,
        onSuccess = options.onSuccess,
        queryParseCallback = options.parseCallback || parseCallback,
        onError = options.onError || onError;

    if (!_.isString(query)) {
      log('query is in a wrong format');
      return;
    }

    var errorHandling = function(sql, err) {
      log('Got an error');
      console.log(err);
      if (_.isFunction(onError)) {
        onError(err);
      }
      sql.close();
    };

    var config = extend(true, {}, dbconfig, options.dbconfig);

    sql.connect(config, function(err) {
      if (err) {
        errorHandling(sql, err);
        return;
      }
      var request = new sql.Request();
      request.multiple = true;
      request.verbose = (options.verbose !== undefined) ? options.verbose : verbose;
      if (verbose) {
        log('Executing query -> ' + query);
      }
      request.query(query, function(err, recordset) {
        if (err) {
          errorHandling(sql, err);
          return;
        }
        if (verbose) {
          log('Retrieved from database -> ' + query);
          console.log(recordset);
        }
        if (_.isFunction(queryParseCallback)) {
          recordset = queryParseCallback(recordset);
        }
        if (_.isFunction(onSuccess)) {
          onSuccess(recordset);
        }

        sql.close();
      });
    });
  };

  // options.storProcName
  // options.args
  // options.onSuccess
  // options.onError
  // options.parseCallback
  // options.verbose
  // options.dbconfig.user
  // options.dbconfig.password
  // options.dbconfig.server
  // options.dbconfig.database
  that.call = function(options) {
    options = options || {};
    if (!options.storProcName) {
      console.log('storProcName was not passed');
      return;
    }

    var storProcName = _.escape(options.storProcName),
        query = 'EXEC [dbo].[' + storProcName + ']',
        argsQuery = [];

    _.each(options.args, function(value, key) {
      if (value === undefined) {
        return;
      }

      if (_.isString(value)) {
        value = wrap(value);
      }

      argsQuery.push('@' + key + '=' + value);
    });

    query = (argsQuery.length) ? query + ' ' + argsQuery.join(',') : query;

    that.query({
      query: query,
      onSuccess: options.onSuccess,
      parseCallback: options.parseCallback,
      onError: options.onError,
      verbose: options.verbose,
      dbconfig: options.dbconfig
    });
  };

  return init(options);
};

module.exports = dataProvider;