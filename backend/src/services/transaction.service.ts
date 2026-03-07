import { prisma } from '../lib/prisma';
import { CreateTransactionInput, UpdateTransactionInput } from '../graphql/input/transaction.input';

export class TransactionService {
    async createTransaction(
        data: CreateTransactionInput,
        userId: string,
        categoryId: string
    ) {
        const category = await prisma.category.findUnique({
            where: { id: categoryId },
        });

        if (!category) {
            throw new Error('Category not found');
        }

        return prisma.transaction.create({
            data: {
                amount: data.amount,
                description: data.description,
                date: data.date,
                type: data.type,
                userId,
                categoryId,
            },
        });
    }

    async listTransactions(userId: string) {
        return prisma.transaction.findMany({
            where: {
                userId,
            },
        });
    }

    async listTransactionsByCategory(categoryId: string) {
        return prisma.transaction.findMany({
            where: {
                categoryId,
            },
        });
    }

    async totalAmountByCategory(categoryId: string) {
        return prisma.transaction.aggregate({
            where: {
                categoryId,
            },
            _sum: {
                amount: true,
            },
        });
    }

    async findTransaction(id: string) {
        return prisma.transaction.findUnique({
            where: { id },
        });
    }

    async updateTransaction(
        id: string,
        data: UpdateTransactionInput,
        categoryId: string
    ) {
        return prisma.transaction.update({
            where: { id },
            data: {
                amount: data.amount,
                description: data.description,
                date: data.date,
                type: data.type,
                categoryId,
            },
        });
    }

    async deleteTransaction(id: string) {
        return prisma.transaction.delete({
            where: { id },
        });
    }

    async countTransactionsInCategory(categoryId: string) {
        return prisma.transaction.count({
            where: {
                categoryId,
            },
        });
    }
}
