# connect-stats

## Install

~~~
› npm install git://github.yandex-team.ru/nodules/connect-stats.git
~~~

## Usage

~~~js
// app/index.js

var connect = require('connect');
var statsMiddleware = require('connect-stats'),
    stats = require('luster').stats;

var app = connect().use(statsMiddleware({
    stats: stats,
    getStatsPrefix: function(req) {
        return 'app.stats.status';
    }
}));
~~~

## Options

### `Object stats`

### `Function getStatsPrefix`
