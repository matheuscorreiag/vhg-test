import { ResponseHelper } from '@helpers/responses';
import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '@user/application/dto/login-user.dto';
import { FindUserByEmailUseCase } from '@user/application/use-cases/find-user-by-email.use-case';
import { Public } from '@user/infra/decorators/public.decorators';

@Controller({
  path: 'users',
  version: '1',
})
export class LoginUserController {
  constructor(
    private readonly findUserByEmail: FindUserByEmailUseCase,
    private readonly jwtService: JwtService,
  ) {}

  @Public()
  @Post('/login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    try {
      const user = await this.findUserByEmail.execute(loginUserDto.email);
      const payload = { email: user.email, id: user.id };

      return ResponseHelper.success({
        ...user,
        token: await this.jwtService.signAsync(payload),
      });
    } catch (error) {
      return ResponseHelper.error(error.message, 'Error trying to login');
    }
  }
}
