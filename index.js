exports = module.exports = function(opts) {
    if (typeof opts === 'undefined') {
        opts = {};
    }

    var stats = opts.stats,
        count;

    if (typeof stats === 'undefined' || typeof stats.count !== 'function') {
        count = function() {};
    } else {
        count = stats.count.bind(stats);
    }

    var getStatsPrefix = opts.getStatsPrefix;

    if (typeof getStatsPrefix !== 'function') {
        getStatsPrefix = function() {
            return 'unknown';
        };
    }

    return function statsMiddleware(req, res, next) {
        function doStats() {
            var key = getStatsPrefix(req),
                statusCode = res.statusCode || 'unknown';

            if (key) {
                count('stats.' + key + '.status.' + statusCode);
            }
        }

        function cleanup() {
            res.removeListener('finish', doStats);
            res.removeListener('error', cleanup);
            res.removeListener('close', cleanup);
        }

        // Add response listeners
        res.once('finish', doStats);
        res.once('error', cleanup);
        res.once('close', cleanup);

        next();
    };
};
