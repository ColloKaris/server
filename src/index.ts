// import express
import express, {Request, Response} from 'express';
import { router } from './routes/loginRoutes';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
// execute express
const app = express()

// parse the contents of a form
app.use(bodyParser.urlencoded({ extended: true}));

app.use(cookieSession({keys: ['laskdjf']}))

// handles router of the application
app.use(router);

// Server to listen on port 3000
app.listen(3000, () => {
  console.log('LISTENING ON PORT 3000')
})