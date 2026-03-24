import {  Arg,  FieldResolver,  Mutation,  Query,  Resolver,  Root,  UseMiddleware} from 'type-graphql';
import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from '../input/transaction.input';
import { GqlUser } from '../../decorators/user.decorator';
import { IsAuth } from '../middlewares/auth.middlewares';
import { CategoryModel } from '../models/category.model';
import { TransactionModel } from '../models/transaction.model';
import { UserModel } from '../models/user.model';
import { CategoryService } from '../../services/category.service';
import { TransactionService } from '../../services/transaction.service';
import { UserService } from '../../services/user.service';

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
  private userService = new UserService();
  private transactionService = new TransactionService();
  private categoryService = new CategoryService();

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg('categoryId', () => String) categoryId: string,
    @Arg('data', () => CreateTransactionInput) data: CreateTransactionInput,
    @GqlUser() user: UserModel
  ): Promise<TransactionModel> {
    return this.transactionService.createTransaction(
      data,
      user.id,
      categoryId
    );
  }

  @Mutation(() => TransactionModel)
  async updateTransaction(
    @Arg('id', () => String) id: string,
    @Arg('categoryId', () => String) categoryId: string,
    @Arg('data', () => UpdateTransactionInput) data: UpdateTransactionInput,
    @GqlUser() user: UserModel
  ): Promise<TransactionModel> {
    return this.transactionService.updateTransaction(
      id,
      data,
      categoryId,
      user.id
    );
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg('id', () => String) id: string,
    @GqlUser() user: UserModel
  ): Promise<boolean> {
    await this.transactionService.deleteTransaction(id, user.id);
    return true;
  }

  @Query(() => [TransactionModel])
  async listTransactions(
    @GqlUser() user: UserModel
  ): Promise<TransactionModel[]> {
    return this.transactionService.listTransactions(user.id);
  }

  @Query(() => TransactionModel)
  async getTransaction(
    @Arg('id', () => String) id: string,
    @GqlUser() user: UserModel
  ): Promise<TransactionModel> {
    return this.transactionService.findTransaction(id, user.id);
  }

  @FieldResolver(() => UserModel)
  async user(
    @Root() transaction: TransactionModel
  ): Promise<UserModel> {
    return this.userService.findUser(transaction.userId);
  }

  @FieldResolver(() => CategoryModel)
  async category(
    @Root() transaction: TransactionModel,
    @GqlUser() user: UserModel
  ): Promise<CategoryModel> {
    return this.categoryService.findCategory(
      transaction.categoryId,
      user.id
    );
  }
}