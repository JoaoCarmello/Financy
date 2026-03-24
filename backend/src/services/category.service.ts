import { prisma } from '../lib/prisma';
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../graphql/input/category.input';

export class CategoryService {
  async createCategory(data: CreateCategoryInput, userId: string) {
    return prisma.category.create({
      data: {
        name: data.name,
        color: data.color,
        description: data.description,
        icon: data.icon,
        userId,
      },
    });
  }

  async listCategories(userId: string) {
    return prisma.category.findMany({
      where: { userId },
    });
  }

  async findCategory(id: string, userId: string) {
    const category = await prisma.category.findFirst({
      where: { id, userId },
    });

    if (!category) throw new Error('Categoria não encontrada');

    return category;
  }

  async updateCategory(
    id: string,
    data: UpdateCategoryInput,
    userId: string
  ) {
    const category = await prisma.category.findFirst({
      where: { id, userId },
    });

    if (!category) throw new Error('Categoria não encontrada');

    return prisma.category.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        color: data.color,
        icon: data.icon,
      },
    });
  }

  async deleteCategory(id: string, userId: string) {
    const result = await prisma.category.deleteMany({
      where: { id, userId },
    });

    if (result.count === 0) {
      throw new Error('Categoria não encontrada ou não pertence ao usuário');
    }

    return true;
  }

  async listCategoriesWithTransactions(userId: string) {
    return prisma.category.findMany({
      where: { userId },
      include: { transactions: true },
    });
  }
}