# NMDB v0.1.0
====

> NodeJS + MSSQ = DataBase layer. Easy to use layer for querying Microsoft databases, built on top of mssql npm module.
> Initially created as a part of my [Pine Project](https://github.com/anvk/Pine)

## Prerequisites

Node + NPM installed

Based on the [MSSQL connector for NodeJS](https://github.com/patriksimek/node-mssql)

## Configuration

### Options

**dbconfig** - configuration required to connect to the Database. user + password + database + server  
**parseCallback** - callback which would be used by default for data manipulation before returning it back to the user for every api call  
**onError** - callback which would be used for error handling for every api call  
**verbose** - boolean to indicate if module should log extra data in the console  
**debug** - boolean for setting debug mode to true (currently not in use)  

### Default options

```javascript
var defaults = {
  dbconfig: {
    user: undefined,
    password: undefined,
    server: undefined,
    database: undefined
  },
  parseCallback: undefined,
  onError: undefined,
  verbose: false,
  debug: false
};
```

### API

#### query(options);

> Function to execute a query in the DB

**query** - query in a string format to be executed in MSSQL database  
**parseCallback** - callback which would be used upon data retreival to parse the returning recordset data  
**onError** - callback which would be used for error handling  
**onSuccess** - callback which would be executed upon data retreival  
**verbose** - true for more console logs for the function  

#### call(options);

> Function to execute a stored procedure in the DB

**storProcName** - name of the stored procedure to be executed  
**args** - object which consist of arguments to be passed into the stored procedure. key is argument's name and value is argument's value  
**parseCallback** - callback which would be used upon data retreival to parse the returning recordset data  
**onError** - callback which would be used for error handling  
**onSuccess** - callback which would be executed upon data retreival  
**verbose** - true for more console logs for the function  

## Testing

### To run tests

```
npm test
```

### To debug tests in Node Inspector

1. Uncomment `beforeEach()` function inside of **tests/nmdb-tests.js**
2. Start node inspector
3. Run the command above
4. Open node inspector url in Chrome to start debugging. (the process is set to wait for 10 seconds before hitting the first breakpoint)

### Problem with mocha command

You might want to try to use `node_modules/.bin/mocha` instead

## License
The MIT License (MIT)

Copyright (c) 2013 Alexey Novak

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.