"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OAuth = require('oauth').OAuth;
var config = require('./../../config');
var fs = require('fs');
var JiraAdapter = (function () {
    function JiraAdapter(_a) {
        var session = _a.session;
        this.session = session;
        var privateKeyData = fs.readFileSync(config.consumerPrivateKeyFile, 'utf8');
        this.connector = new OAuth(config.jiraUrl + '/plugins/servlet/oauth/request-token', config.jiraUrl + '/plugins/servlet/oauth/access-token', config.consumerKey, '', '1.0', config.applicationUrl + '/api/callback', 'RSA-SHA1', null, privateKeyData);
    }
    JiraAdapter.prototype.getRequestToken = function (callback) {
        var _this = this;
        this.connector.getOAuthRequestToken(function (error, requestToken, requestSecret) {
            _this.session.requestToken = requestToken;
            _this.session.requestSecret = requestSecret;
            callback(error);
        });
    };
    JiraAdapter.prototype.getAccessToken = function (verifier, callback) {
        var _this = this;
        this.connector.getOAuthAccessToken(this.session.requestToken, this.session.requestSecret, verifier, function (error, accessToken, accessSecret) {
            _this.session.accessToken = accessToken;
            _this.session.accessSecret = accessSecret;
            callback(error);
        });
    };
    JiraAdapter.prototype.getAuthorizationUrl = function () {
        return config.jiraUrl + '/plugins/servlet/oauth/authorize?oauth_token=' + this.session.requestToken;
    };
    JiraAdapter.prototype.get = function (endpoint) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connector.get(endpoint, _this.session.accessToken, _this.session.accessSecret, "application/json", function (error, data) {
                try {
                    var parsedData = JSON.parse(data);
                    resolve(data);
                }
                catch (error) {
                    reject(error);
                }
            });
        });
    };
    return JiraAdapter;
}());
exports.default = JiraAdapter;
//# sourceMappingURL=jira.adapter.js.map