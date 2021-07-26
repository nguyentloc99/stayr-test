import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
} from '@nestjs/common';
import { SignUpDTO } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { ValidateTokenDTO } from './dto/validate-token.dto';
import { ValidateTokenResponse } from './response/validate-token.response';
import { FirebaseAuthService } from '../../external-services/firebase/firebase-auth/fire-base.auth.service';
import { UserService } from '../user/user.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../user/user.entity';
@ApiTags('Authenticate')
@Controller('auth')
export class AuthController {
  @Inject()
  private authService: AuthService;

  @Inject()
  private firebaseAuthService: FirebaseAuthService;

  @Inject()
  private userService: UserService;

  @Post('signUp')
  @ApiOkResponse({ type: User })
  async signUp(@Body() signUpDto: SignUpDTO) {
    return this.authService.registerUser(signUpDto);
  }

  @Post('validateToken')
  @ApiOkResponse({ type: ValidateTokenResponse })
  async validateToken(
    @Body() data: ValidateTokenDTO,
  ): Promise<ValidateTokenResponse> {
    try {
      const firebaseResult = await this.firebaseAuthService.verifyToken(
        data.token,
      );
      const usersFound = await this.userService.findByFirebaseId(
        firebaseResult.uid,
      );
      if (!usersFound.length) {
        throw new Error();
      }
      const response: ValidateTokenResponse = usersFound[0];
      return response;
    } catch (err) {
      throw new BadRequestException('Invalid Token');
    }
  }
}
