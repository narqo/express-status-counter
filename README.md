# connect-stats

## Install

~~~
› npm install git://github.yandex-team.ru/nodules/connect-stats.git
~~~

## Usage

~~~js
// server.js

var connect = require('connect'),
    statsMiddleware = require('connect-stats'),
    stats = require('luster').stats;

var app = connect()

app.use(statsMiddleware(stats, function getStatsPrefix(req) {
    return 'app.stats.status';
}));
~~~

## Options

### `Object stats`

### `Function getStatsPrefix`
