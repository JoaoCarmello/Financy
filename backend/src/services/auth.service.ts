import { prisma } from '../lib/prisma';
import { LoginInput, RegisterInput } from '../graphql/input/auth.input';
import { UserModel } from '../graphql/models/user.model';
import { comparePassword, hashPassword } from '../utils/hash';
import { signJwt } from '../utils/jwt';

export class AuthService {
  async login(data: LoginInput) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!existingUser) throw new Error('Usuário não cadastrado!');
    const compare = await comparePassword(data.password, existingUser.password);
    if (!compare) throw new Error('Senha inválida!');
    return this.gerenerateTokens(existingUser);
  }

  async register(data: RegisterInput) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (existingUser) throw new Error('E-mail já cadastrado!');

    const hash = await hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hash,
      },
    });
    return this.gerenerateTokens(user);
  }

  gerenerateTokens(user: UserModel) {
    const token = signJwt({ id: user.id, email: user.email }, '1d');
    const refreshToken = signJwt({ id: user.id, email: user.email }, '1d');
    return { token, refreshToken, user };
  }
}
