"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var auth_1 = require("./auth");
var jira_1 = require("./jira");
var createError = require("http-errors");
var index = express.Router();
index.use('/', auth_1.default);
index.use(function (request, response, next) {
    var authController = request.container.cradle.authController;
    if (!authController.checkIfLogged()) {
        next(new createError.Unauthorized());
    }
    else {
        next();
    }
});
index.use('/jira', jira_1.default);
exports.default = index;
//# sourceMappingURL=index.js.map