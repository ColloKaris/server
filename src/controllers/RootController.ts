import { Request, Response, NextFunction} from 'express';
import { get, controller, use} from './decorators';

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  // Set up a type guard
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send('Not permitted');
}

@controller('')
class RootController {
  @get('/')
  getRoot(req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
      res.send(`
      <div>
        <div>You are logged In </div>
        <a href="/auth/logout">Logout</a>
      </div>
      `);
    } else {
      res.send(`
      <div>
        <div>You are NOT logged In </div>
        <a href="/auth/login">Login</a>
      </div>
      `);
    }
  }

  // remember execution of actual decorator will be from bottom up
  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response){
    res.send('Welcome to protected route, logged in user')
  }
}