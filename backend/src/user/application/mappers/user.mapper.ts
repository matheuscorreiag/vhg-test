import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@user/application/dto/create-user.dto';
import { User } from '@user/domain/entities/user';
import { User as PrismaUserModel } from '@prisma/client';

@Injectable()
export class UserMapper {
  static toDomain(dto: CreateUserDto): User {
    return new User({
      email: dto.email,
      password: dto.password,
    });
  }

  static prismaToDomain(user: PrismaUserModel): User {
    return new User({
      id: user.id,
      email: user.email,
    });
  }
}
