import { prisma } from '../lib/prisma';
import { CreateUserInput, UpdateUserInput } from '../graphql/input/user.input';

export class UserService {
  async createUser(data: CreateUserInput) {
    const findUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (findUser) throw new Error('Usuário já cadastrado!');

    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
      },
    });
  }

  async findUser(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) throw new Error('Usuário não existe');
    return user;
  }

  async listUsers() {
    return prisma.user.findMany();
  }

  async updateUser(id: string, data: UpdateUserInput) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new Error('Usuário não existe');

    return prisma.user.update({
      where: { id },
      data: {
        name: data.name ?? undefined,
        role: data.role ?? undefined,
      },
    });
  }

  async deleteUser(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new Error('Usuário não existe');

    await prisma.user.delete({
      where: { id },
    });

    return true;
  }
}
