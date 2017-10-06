import * as express from 'express';
import * as session from 'express-session';
import Request from './types/request'
import index from './routes/index';
import configureContainer from './configureContainer'


const app: express.Express = express();
const container: any = configureContainer();

 app.use(session({
    secret: 'SuPeRsEcReTkEy!!11!1oneoneeleven',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use((request: Request, response: express.Response, next: Function) => {
    container.registerValue({
        request: request,
        response: response,
        next: next,
        session: request.session,
    });
    request.container = container;
    next();
});

app.use('/api', index);

app.use((error: any, request: express.Request, response: express.Response, next: Function) => {
    response.statusCode = error.status || 500;
    response.send(error.message || error.data);
    throw error;
});

const port:String = process.env.PORT || '3001';
app.listen(port, () => {
    console.log('App listening on port '+port)
})

export default app;