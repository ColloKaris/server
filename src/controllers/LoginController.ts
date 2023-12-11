/**
 * Remember to also import this file in the index.ts file
 * Otherwise this file will never be executed
 */

import { Request, Response, NextFunction} from 'express';
import { get, controller, bodyValidator, post} from './decorators';

@controller('/auth')
class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response): void{
    res.send(`
    <form method="POST">
      <div>
        <label>Email</label>
        <input name="email" />
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password" />
      </div>
      <button>Submit</button>
    </form>`) 
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request,res: Response) {
    const { email, password } = req.body;
    if ((email && password) && (email === 'hi@hi.com' && password === 'password')) {
      // mark this person as logged in
      req.session = {loggedIn: true}
      // redirect them to the root route
      res.redirect('/');
    } else {
      res.send('Invalid email or password');
    }
  }
}