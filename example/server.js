var url = require('url'),
    express = require('express'),
    statsMiddleware = require('../');

const stats = {
    count(metric) {
        console.log(metric);
    }
};

const app = express();

app.use(statsMiddleware(stats, req => {
    var reqUrl = url.parse(req.url);
    return reqUrl.pathname.replace(/^\/|\/\$/g, '').replace(/\//g, '.');
}));

const server = app.listen(8000, function() {
    console.log('server is listening', server.address());
});
