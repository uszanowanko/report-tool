import * as express from 'express';
import Container from './container';

export default interface Request extends express.Request {
    container: Container
}