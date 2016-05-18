var util = require('util'),
    onFinished = require('on-finished');

var defaultPrefix = function() {
    return 'unknown';
};

exports = module.exports = function(opts, getNamePrefix) {
    if (typeof opts === 'undefined') {
        opts = {};
    }

    var stats;

    if (typeof opts.count === 'function') {
        stats = opts;
    } else {
        stats = opts.stats;
    }

    var counter = typeof stats !== 'undefined' && typeof stats.count === 'function' ?
        stats.count.bind(stats) : null;

    if (typeof getNamePrefix !== 'function') {
        getNamePrefix = defaultPrefix;
    }

    return function statsMiddleware(req, res, next) {
        onFinished(res, function(err, res) {
            if (err !== null || counter === null) {
                return;
            }

            var name = getNamePrefix(req),
                statusCode = res.statusCode || 0;

            if (name) {
                counter(util.format('%s-%dxx', name, parseInt(statusCode / 100, 10)));
            }
        });
        next();
    };
};

exports.defaultStatusNamePrefix = defaultPrefix;
