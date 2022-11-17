import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  // user id
  sub: string
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction){
  // Receive token
  const authToken = req.headers.authorization; 
  if(!authToken){
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ");
  try{
    const { sub } = verify(
      token,
      process.env.JWT_SECRET
    ) as Payload
    
    // Recover token id and put it on user_id
    req.user_id = sub;

    return next();
  } catch {
    return res.status(401).end();
  }
}