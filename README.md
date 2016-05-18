# express-status-counter

## Install

~~~
› npm install -S express-status-counter
~~~

## Usage

~~~js
// server.js

var connect = require('connect'),
    statusCounterMiddleware = require('express-status-counter'),
    stats = require('luster').stats;

var app = connect()

app.use(statusCounterMiddleware(stats, function getStatusNamePrefix(req) {
    return 'app.stats.status';
}));
~~~

## Options

### `Object stats`

### `Function getStatusNamePrefix`
