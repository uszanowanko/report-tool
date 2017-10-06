import * as express from 'express';
import AuthController from '../controllers/auth.controller';
import JiraAdapter from '../adapters/jira.adapter';
import Request from './../types/request'

const auth: express.Router = express.Router();
const authController = new AuthController(JiraAdapter)

auth.get('/login', (request: Request) => {
    const authController: AuthController = request.container.cradle.authController;
    authController.login();
});
auth.get('/callback', (request: Request) => {
    const authController: AuthController = request.container.cradle.authController;
    authController.handleCallback();
});

export default auth;