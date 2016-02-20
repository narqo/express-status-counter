var onFinished = require('on-finished');

function defaultStatsPrefix() {
    return 'unknown';
}

exports = module.exports = function(opts, getStatsPrefix) {
    if (typeof opts === 'undefined') {
        opts = {};
    }

    var stats;

    if (typeof opts.count === 'function') {
        stats = opts;
    } else {
        stats = opts.stats;
    }

    var count = typeof stats !== 'undefined' && typeof stats.count === 'function' ?
        stats.count.bind(stats) : null;

    if (typeof getStatsPrefix !== 'function') {
        getStatsPrefix = defaultStatsPrefix;
    }

    return function statsMiddleware(req, res, next) {
        onFinished(res, function(err, res) {
            if (count === null || err !== null) {
                return;
            }

            var key = getStatsPrefix(req),
                statusCode = res.statusCode || 'unknown';

            if (key) {
                count('stats.' + key + '.status.' + statusCode);
            }
        });
        next();
    };
};

exports.defaultStatsPrefix = defaultStatsPrefix;
