import JiraAdapter from "../adapters/jira.adapter";

import * as express from 'express';

export default class JiraController {
    private jiraAdapter: JiraAdapter;
    private response: express.Response;
    
    constructor({jiraAdapter, response}: any) {
        this.jiraAdapter = jiraAdapter;
        this.response = response;
    }

    public async getWorklog() {
        const worklogs = await this.jiraAdapter.get("")
        this.response.send(worklogs);
    }
}