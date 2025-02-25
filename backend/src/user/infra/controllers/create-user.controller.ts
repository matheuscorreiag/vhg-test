import { ResponseHelper } from '@helpers/responses';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '@user/application/dto/create-user.dto';
import { CreateUserUseCase } from '@user/application/use-cases/create-user.use-case';

@Controller({
  path: 'users',
  version: '1',
})
export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.createUserUseCase.execute(createUserDto);

      return ResponseHelper.success({ ...user, token: '' });
    } catch (error) {
      return { error: error.message };
    }
  }
}
