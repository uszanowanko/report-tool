import * as express from 'express';
import JiraController from '../controllers/jira.controller';
import Request from './../types/request'

const jira: express.Router = express.Router();

jira.get('/worklog', (request: Request) => {
    const jiraController: JiraController = request.container.cradle.jiraController;
    jiraController.getWorklog();
});
export default jira;