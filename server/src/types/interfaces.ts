import type { Request } from "express";

export interface CustomRequest extends Request {
  user?: {
    id: string;
    username: string;
  };
}

export interface JwtDecoded {
  id: string;
  username: string;
}
