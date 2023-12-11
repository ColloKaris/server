// This file was to be deleted after making all the edits
// this is because it is no longer being use after decorators and metadata
// were implemented. I let is stay for the sake of learning

import { Router, Request, Response, NextFunction} from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined}
}

const router = Router();

export { router };