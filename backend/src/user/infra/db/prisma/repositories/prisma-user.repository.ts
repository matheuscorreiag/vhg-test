import { PrismaService } from '@libs/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserMapper } from '@user/application/mappers/user.mapper';
import { User } from '@user/domain/entities/user';
import { UserRepository } from '@user/domain/repositories/user.repository';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    if (!user.password) {
      throw new Error('Password is required');
    }

    return this.prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
      },
      omit: { password: true },
    });
  }

  async findByEmail(email: string): Promise<User> {
    const dbUser = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!dbUser) {
      throw new Error('User not found');
    }

    return UserMapper.prismaToDomain(dbUser);
  }
}
