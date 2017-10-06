"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var session = require("express-session");
var index_1 = require("./routes/index");
var configureContainer_1 = require("./configureContainer");
var app = express();
var container = configureContainer_1.default();
app.use(session({
    secret: 'SuPeRsEcReTkEy!!11!1oneoneeleven',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(function (request, response, next) {
    container.registerValue({
        request: request,
        response: response,
        next: next,
        session: request.session,
    });
    request.container = container;
    next();
});
app.use('/api', index_1.default);
app.use(function (error, request, response, next) {
    response.statusCode = error.status || 500;
    response.send(error.message || error.data);
    throw error;
});
var port = process.env.PORT || '3001';
app.listen(port, function () {
    console.log('App listening on port ' + port);
});
exports.default = app;
//# sourceMappingURL=server.js.map