import { prisma } from '../lib/prisma';
import { CreateTransactionInput, UpdateTransactionInput } from '../graphql/input/transaction.input';

export class TransactionService {

    async createTransaction(
        data: CreateTransactionInput,
        userId: string,
        categoryId: string
    ) {
        try {
            if (!data.description || data.amount <= 0) {
                throw new Error('Dados inválidos');
            }

            const category = await prisma.category.findFirst({
                where: { id: categoryId, userId },
            });

            if (!category) {
                throw new Error('Categoria não encontrada');
            }

            return await prisma.transaction.create({
                data: {
                    amount: data.amount,
                    description: data.description,
                    date: data.date,
                    type: data.type,
                    userId,
                    categoryId,
                },
            });
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao criar transação');
        }
    }

    async listTransactions(userId: string) {
        try {
            return await prisma.transaction.findMany({
                where: { userId },
            });
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao listar transações');
        }
    }

    async listTransactionsByCategory(categoryId: string, userId: string) {
        try {
            return await prisma.transaction.findMany({
                where: {
                    categoryId,
                    userId,
                },
            });
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao listar por categoria');
        }
    }

    async totalAmountByCategory(categoryId: string, userId: string) {
        try {
            return await prisma.transaction.aggregate({
                where: {
                    categoryId,
                    userId,
                },
                _sum: {
                    amount: true,
                },
            });
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao calcular total');
        }
    }

    async findTransaction(id: string, userId: string) {
        try {
            const transaction = await prisma.transaction.findFirst({
                where: { id, userId },
            });

            if (!transaction) {
                throw new Error('Transação não encontrada');
            }

            return transaction;
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao buscar transação');
        }
    }

    async updateTransaction(
        id: string,
        data: UpdateTransactionInput,
        categoryId: string,
        userId: string
    ) {
        try {
            const transaction = await prisma.transaction.findFirst({
                where: { id, userId },
            });

            if (!transaction) {
                throw new Error('Transação não encontrada');
            }

            const category = await prisma.category.findFirst({
                where: { id: categoryId, userId },
            });

            if (!category) {
                throw new Error('Categoria não encontrada');
            }

            return await prisma.transaction.update({
                where: { id },
                data: {
                    amount: data.amount,
                    description: data.description,
                    date: data.date,
                    type: data.type,
                    categoryId,
                },
            });
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao atualizar transação');
        }
    }

    async deleteTransaction(id: string, userId: string) {
        try {
            const result = await prisma.transaction.deleteMany({
                where: { id, userId },
            });

            if (result.count === 0) {
                throw new Error('Transação não encontrada ou não pertence ao usuário');
            }

            return true;
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao deletar transação');
        }
    }

    async countTransactionsInCategory(categoryId: string, userId: string) {
        try {
            return await prisma.transaction.count({
                where: {
                    categoryId,
                    userId,
                },
            });
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao contar transações');
        }
    }
}