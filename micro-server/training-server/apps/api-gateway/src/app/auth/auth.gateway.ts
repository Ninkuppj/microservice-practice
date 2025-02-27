import { AuthGuard, CookieEmptyPipe, Cookies } from '@config';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Res,
  UseFilters,
  UseGuards
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CustomExceptionFilter,
  ILoginRespone,
  LoginDTO
} from '@shared';
import { firstValueFrom } from 'rxjs';
@Controller('auth')
@UseFilters(CustomExceptionFilter)
export class AuthsController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
    ) {}

  @Post('login')
  public async login(
    @Body() loginRequest: LoginDTO
  ): Promise<ILoginRespone> {
    try {
      const getAuthResponse: ILoginRespone = await firstValueFrom(
        this.authServiceClient.send('login', loginRequest),
      );
    return getAuthResponse;
  } catch (error) {
        throw new HttpException(error,
          HttpStatus.UNAUTHORIZED,
        );
    }

     
      // res.cookie('auth_token', createTokenResponse.token) beffore use cookie in respone  run command // npm i cookie-parser   // npm i -D @types/cookie-parser
  }

  @Post('token_referesh')
  public async refreshToken(
    @Res({ passthrough: true }) res: Response,
    @Cookies('refresh_token', CookieEmptyPipe) refreshToken: string,
  ) {
    return await this.authServiceClient.send('token_refresh', {
      refreshToken: refreshToken,
    });
  }

}
  