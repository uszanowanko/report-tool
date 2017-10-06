import * as express from 'express';
import * as createError from 'http-errors';
import JiraAdapter from '../adapters/jira.adapter';


export default class AuthController {
    private jiraAdapter: JiraAdapter;
    private request: express.Request;
    private response: express.Response;
    private next: Function;
    private session: any;

    constructor({jiraAdapter, request, response, next, session}: any) {
        this.jiraAdapter = jiraAdapter;
        this.request = request;
        this.response = response;
        this.next = next;
        this.session = session;
    }

    public checkIfLogged = (): boolean => {
        return !!this.session.accessToken;
    }

    public login = (): void => {
        if (this.checkIfLogged()) {
            this.response.sendStatus(200)
        } else {
            this.getRequestToken()
        }
    }

    public handleCallback = (): void => {
        if (!this.checkRequestToken()) {
            this.next(new createError.BadRequest())
        }
        this.authorizeToken()
    }

    private checkRequestToken = (): boolean => {
        return this.session.requestToken && !this.session.accessToken;
    }
    
    private getRequestToken = (): void => {
        this.jiraAdapter.getRequestToken((error: Error) => {
            if (error) {
                this.next(error);
            } else {
                this.response.redirect(this.jiraAdapter.getAuthorizationUrl());
            }
        });
    }

    private authorizeToken = (): void => {
        this.jiraAdapter.getAccessToken(this.request.query.oauth_verifier, (error: Error) => {
            if (error) {
                this.next(error);
            } else {
                this.response.sendStatus(200)
            }
        });
    }
}