import { prisma } from '../lib/prisma';
import { CreateCategoryInput, UpdateCategoryInput } from '../graphql/input/category.input';

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
            where: {
                userId,
            },
        });
    }

    async findCategory(id: string) {
        return prisma.category.findUnique({
            where: { id },
        });
    }

    async updateCategory(id: string, data: UpdateCategoryInput) {
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

    async deleteCategory(id: string) {
        return prisma.category.delete({
            where: { id },
        });
    }

    async listCategoriesWithTransactions(userId: string) {
        return prisma.category.findMany({
            where: {
                userId,
            },
            include: {
                transactions: true,
            },
        });
    }
}
