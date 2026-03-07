import { Request, Response } from "express";
import { verifyJwt } from "../../utils/jwt";

export type GraphqlContext = {
  user?: string;
  token?: string;
  req: Request;
  res: Response;
};

export const buildContext = async ({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Promise<GraphqlContext> => {
  const authHeader = req.headers.authorization;

  let user: string | undefined;
  let token: string | undefined;

  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.substring("Bearer ".length);

    try {
      const payload = verifyJwt(token);
      user = payload.id;
    } catch (error) {
      console.error("Error verifying JWT:", error);
    }
  }

  return {
    user,
    token,
    req,
    res,
  };
};