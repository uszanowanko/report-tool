"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var jira = express.Router();
jira.get('/worklog', function (request) {
    var jiraController = request.container.cradle.jiraController;
    jiraController.getWorklog();
});
exports.default = jira;
//# sourceMappingURL=jira.js.map