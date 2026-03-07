import { MiddlewareFn } from 'type-graphql';
import { GraphqlContext } from '../context';

export const IsAuth: MiddlewareFn<GraphqlContext> = async (
  { context },
  next
) => {
  if (!context.user) throw new Error('User not authenticated!');
  return next();
};
