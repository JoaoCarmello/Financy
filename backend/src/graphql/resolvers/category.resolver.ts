import {
  Arg,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
  FieldResolver,
  Root,
} from 'type-graphql';

import { GqlUser } from '../../decorators/user.decorator';
import { IsAuth } from '../middlewares/auth.middlewares';
import { CategoryModel } from '../models/category.model';
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../input/category.input';
import { CategoryService } from '../../services/category.service';
import { UserModel } from '../models/user.model';
import { TransactionService } from '../../services/transaction.service';

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {
  private categoryService = new CategoryService();
  private transactionService = new TransactionService();

  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg('data', () => CreateCategoryInput) data: CreateCategoryInput,
    @GqlUser() user: UserModel
  ): Promise<CategoryModel> {
    return this.categoryService.createCategory(data, user.id);
  }

  @Mutation(() => CategoryModel)
  async updateCategory(
    @Arg('id', () => String) id: string,
    @Arg('data', () => UpdateCategoryInput) data: UpdateCategoryInput,
    @GqlUser() user: UserModel
  ): Promise<CategoryModel> {
    return this.categoryService.updateCategory(id, data, user.id);
  }

  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg('id', () => String) id: string,
    @GqlUser() user: UserModel
  ): Promise<boolean> {
    await this.categoryService.deleteCategory(id, user.id);
    return true;
  }

  @Query(() => [CategoryModel])
  async listCategories(
    @GqlUser() user: UserModel
  ): Promise<CategoryModel[]> {
    return this.categoryService.listCategories(user.id);
  }

  @FieldResolver(() => Number)
  async countTransactions(
    @Root() category: CategoryModel,
    @GqlUser() user: UserModel
  ): Promise<number> {
    return this.transactionService.countTransactionsInCategory(
      category.id,
      user.id
    );
  }
  @FieldResolver(() => Number)
  async totalAmount(
    @Root() category: CategoryModel,
    @GqlUser() user: UserModel
  ): Promise<number> {
    const result = await this.transactionService.totalAmountByCategory(
      category.id,
      user.id
    );
    return result._sum.amount || 0;
  }
}