import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FirebaseAuthService } from '../../external-services/firebase/firebase-auth/fire-base.auth.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { SignUpDTO } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  @Inject()
  private firebaseAuthService: FirebaseAuthService;

  @Inject()
  private userService: UserService;

  async registerUser(signUpDto: SignUpDTO) {
    const createdFirebaseUser = await this.firebaseAuthService.createUser({
      email: signUpDto.email,
      password: signUpDto.password,
    });
    const newUser = new User();
    newUser.firebaseUid = createdFirebaseUser.uid;
    newUser.dob = signUpDto.dob;
    newUser.name = signUpDto.name;
    try {
      const createdUser = await this.userService.save(newUser);
      return createdUser;
    } catch (e) {
      this.firebaseAuthService.removeUser(createdFirebaseUser.uid);
      throw new InternalServerErrorException('Saving failed');
    }
  }
}
