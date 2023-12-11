// import express
import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import './controllers/LoginController';
import { AppRouter } from './AppRouter';
import './controllers/LoginController';
import './controllers/RootController'


// execute express
const app = express()

// parse the contents of a form
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieSession({keys: ['laskdjf']}))

// handles router of the application
app.use(AppRouter.getInstance());

// Server to listen on port 3000
app.listen(3000, () => {
  console.log('LISTENING ON PORT 3000')
})