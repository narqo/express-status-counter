var url = require('url'),
    express = require('express'),
    statusCounterMiddleware = require('../');

const statusCounter = {
    count(metric) {
        console.log(metric);
    }
};

const app = express();

app.use(statusCounterMiddleware(statusCounter, req => {
    return url.parse(req.url).pathname
        .replace(/^\/|\/\$/g, '')
        .replace(/\./g, '_')
        .replace(/\//g, '.') + '.status';
}));

const server = app.listen(8000, function() {
    console.log('server is listening', server.address());
});
