const OAuth = require('oauth').OAuth;
const config = require('./../../config');
const fs = require('fs');

export interface Token {
    token: string,
    secret: string
}

export default class JiraAdapter {
    private connector: any;
    private session: any;

    constructor({session}: any) {
        this.session = session;
        const privateKeyData = fs.readFileSync(config.consumerPrivateKeyFile, 'utf8');
        this.connector = new OAuth(config.jiraUrl + '/plugins/servlet/oauth/request-token',
            config.jiraUrl +'/plugins/servlet/oauth/access-token',
            config.consumerKey,
            '',
            '1.0',
            config.applicationUrl+'/api/callback',
            'RSA-SHA1',
            null,
            privateKeyData);
    }

    public getRequestToken(callback:Function): void {
        this.connector.getOAuthRequestToken((error: Error, requestToken: string, requestSecret: string) => {
            this.session.requestToken = requestToken;
            this.session.requestSecret = requestSecret;
            callback(error);
        });
    }

    public getAccessToken(verifier: string, callback: Function): void {
        this.connector.getOAuthAccessToken(this.session.requestToken, this.session.requestSecret, verifier, (error: Error, accessToken: string, accessSecret: string) => {
            this.session.accessToken = accessToken;
            this.session.accessSecret = accessSecret;
            callback(error);
        });
    }
    
    public getAuthorizationUrl(): string {
        return config.jiraUrl + '/plugins/servlet/oauth/authorize?oauth_token=' + this.session.requestToken;
    }

    public get(endpoint: string) {
        return new Promise((resolve: Function, reject: Function) => {
            this.connector.get(endpoint, 
                this.session.accessToken, 
                this.session.accessSecret, 
                "application/json",
                (error: Error, data: any) => {
                    try {
                        var parsedData = JSON.parse(data);
                        resolve(data);
                    } catch (error) {
                        reject(error);
                    }
                }
            );
        })
    }
}