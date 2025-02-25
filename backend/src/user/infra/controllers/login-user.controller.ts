import { ResponseHelper } from '@helpers/responses';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from '@user/application/dto/login-user.dto';
import { FindUserByEmailUseCase } from '@user/application/use-cases/find-user-by-email.use-case';

@Controller({
  path: 'users',
  version: '1',
})
export class LoginUserController {
  constructor(private readonly findUserByEmail: FindUserByEmailUseCase) {}

  @Post('/login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    try {
      const user = await this.findUserByEmail.execute(loginUserDto.email);

      return ResponseHelper.success({ ...user, token: '' });
    } catch (error) {
      return { error: error.message };
    }
  }
}
