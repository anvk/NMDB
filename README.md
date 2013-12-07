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

#### call(options);

> Function to execute a stored procedure in the DB

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