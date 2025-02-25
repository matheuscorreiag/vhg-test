declare namespace Express {
  export interface Request {
    userPayload: {
      id: string;
      email: string;
    };
  }
}
