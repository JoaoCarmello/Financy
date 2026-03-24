import { prisma } from '../lib/prisma';
import { LoginInput, RegisterInput } from '../graphql/input/auth.input';
import { UserModel } from '../graphql/models/user.model';
import { comparePassword, hashPassword } from '../utils/hash';
import { signJwt } from '../utils/jwt';

export class AuthService {

  async login(data: LoginInput) {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (!existingUser) {
        throw new Error('Credenciais inválidas');
      }

      const isValidPassword = await comparePassword(
        data.password,
        existingUser.password
      );

      if (!isValidPassword) {
        throw new Error('Credenciais inválidas');
      }

      return this.generateTokens(existingUser);
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao realizar login');
    }
  }

  async register(data: RegisterInput) {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        throw new Error('E-mail já cadastrado');
      }

      const hash = await hashPassword(data.password);

      const user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hash,
        },
      });

      return this.generateTokens(user);
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao registrar usuário');
    }
  }

  generateTokens(user: UserModel) {
    
    const token = signJwt(
      { id: user.id, email: user.email },'1h');

    const refreshToken = signJwt(
      { id: user.id, email: user.email },'1d');

    return { token, refreshToken, user };
  }
}