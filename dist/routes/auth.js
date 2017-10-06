"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var auth_controller_1 = require("../controllers/auth.controller");
var jira_adapter_1 = require("../adapters/jira.adapter");
var auth = express.Router();
var authController = new auth_controller_1.default(jira_adapter_1.default);
auth.get('/login', function (request) {
    var authController = request.container.cradle.authController;
    authController.login();
});
auth.get('/callback', function (request) {
    var authController = request.container.cradle.authController;
    authController.handleCallback();
});
exports.default = auth;
//# sourceMappingURL=auth.js.map