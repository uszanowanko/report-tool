"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createError = require("http-errors");
var AuthController = (function () {
    function AuthController(_a) {
        var jiraAdapter = _a.jiraAdapter, request = _a.request, response = _a.response, next = _a.next, session = _a.session;
        var _this = this;
        this.checkIfLogged = function () {
            return !!_this.session.accessToken;
        };
        this.login = function () {
            if (_this.checkIfLogged()) {
                _this.response.sendStatus(200);
            }
            else {
                _this.getRequestToken();
            }
        };
        this.handleCallback = function () {
            if (!_this.checkRequestToken()) {
                _this.next(new createError.BadRequest());
            }
            _this.authorizeToken();
        };
        this.checkRequestToken = function () {
            return _this.session.requestToken && !_this.session.accessToken;
        };
        this.getRequestToken = function () {
            _this.jiraAdapter.getRequestToken(function (error) {
                if (error) {
                    _this.next(error);
                }
                else {
                    _this.response.redirect(_this.jiraAdapter.getAuthorizationUrl());
                }
            });
        };
        this.authorizeToken = function () {
            _this.jiraAdapter.getAccessToken(_this.request.query.oauth_verifier, function (error) {
                if (error) {
                    _this.next(error);
                }
                else {
                    _this.response.sendStatus(200);
                }
            });
        };
        this.jiraAdapter = jiraAdapter;
        this.request = request;
        this.response = response;
        this.next = next;
        this.session = session;
    }
    return AuthController;
}());
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map