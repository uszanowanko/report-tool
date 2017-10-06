import * as express from 'express';
import Request from './../types/request'
import auth from './auth';
import jira from './jira';
import AuthController from '../controllers/auth.controller';
import JiraAdapter from '../adapters/jira.adapter';
import * as createError from 'http-errors';

const index: express.Router = express.Router();

index.use('/', auth);

index.use(function(request: Request, response: express.Response, next: Function) {
    const authController = request.container.cradle.authController;
    if (!authController.checkIfLogged()) {
        next(new createError.Unauthorized());
    } else {
        next();
    }
});

index.use('/jira', jira);

export default index;