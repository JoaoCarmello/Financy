import { createParameterDecorator, ResolverData } from "type-graphql";
import { prisma } from "../lib/prisma";
import { GraphqlContext } from "../graphql/context";
import { UserModel } from "../graphql/models/user.model";

export const GqlUser = () =>
  createParameterDecorator(
    async ({ context }: ResolverData<GraphqlContext>): Promise<UserModel | null> => {

      if (!context.user) {
        return null;
      }

      const user = await prisma.user.findUnique({
        where: {
          id: context.user,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      return user as unknown as UserModel;
    }
  );