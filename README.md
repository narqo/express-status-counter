# express-status-counter

[![NPM version][https://img.shields.io/npm/v/express-status-counter.svg?style=flat]][https://npmjs.org/package/express-status-counter]
[![Build Status](https://travis-ci.org/narqo/express-status-counter.svg)](https://travis-ci.org/narqo/express-status-counter)
[![Dependency Status](https://david-dm.org/narqo/react-islands.svg)](https://david-dm.org/narqo/express-status-counter)
[![devDependency Status](https://david-dm.org/narqo/react-islands/dev-status.svg)](https://david-dm.org/narqo/express-status-counter#info=devDependencies)

[express](http://expressjs.com/) middleware that counts response by the first digit of its HTTP status codes.

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

// Every response will be counted by `stats` function as `app.stats.status-<N>xx`,
// where `N` is the first digit of HTTP status code.
app.use(statusCounterMiddleware(stats, function getStatusNamePrefix(req) {
    return 'app.stats.status';
}));
~~~

## Options

### `stats: Object`

### `getStatusNamePrefix: Function(req: http.IncomingMessage): String`
