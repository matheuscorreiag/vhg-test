import { ResponseHelper } from '@helpers/responses';
import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '@user/application/dto/create-user.dto';
import { CreateUserUseCase } from '@user/application/use-cases/create-user.use-case';
import { Public } from '@user/infra/decorators/public.decorators';

@Controller({
  path: 'users',
  version: '1',
})
export class CreateUserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly jwtService: JwtService,
  ) {}

  @Public()
  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.createUserUseCase.execute(createUserDto);
      const payload = { email: user.email, id: user.id };

      return ResponseHelper.success({
        ...user,
        token: await this.jwtService.signAsync(payload),
      });
    } catch (error) {
      return ResponseHelper.error(error.message, 'Error trying to create user');
    }
  }
}
