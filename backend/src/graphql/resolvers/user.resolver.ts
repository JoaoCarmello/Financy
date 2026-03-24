import { Arg,  Ctx,  Mutation,  Query,  Resolver,  UseMiddleware} from 'type-graphql';
import { UpdateUserInput } from '../input/user.input';
import { GraphqlContext } from '../context';
import { IsAuth } from '../middlewares/auth.middlewares';
import { UserModel } from '../models/user.model';
import { UserService } from '../../services/user.service';

@Resolver(() => UserModel)
@UseMiddleware(IsAuth)
export class UserResolver {
  private userService = new UserService();

  @Mutation(() => UserModel)
  async updateUser(
    @Arg('data', () => UpdateUserInput) data: UpdateUserInput,
    @Ctx() ctx: GraphqlContext
  ): Promise<UserModel> {
    return this.userService.updateUser(ctx.user, data);
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Ctx() ctx: GraphqlContext
  ): Promise<boolean> {
    return this.userService.deleteUser(ctx.user);
  }

  @Query(() => UserModel)
  async getUser(
    @Ctx() ctx: GraphqlContext
  ): Promise<UserModel> {
    return this.userService.findUser(ctx.user);
  }

  @Query(() => [UserModel])
  async listUsers(): Promise<UserModel[]> {
    throw new Error('Não autorizado');
  }
}