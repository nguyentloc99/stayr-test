import { BadRequestException } from '@nestjs/common';
import { FirebaseError } from 'firebase-admin';

export function handleAuthError(e: FirebaseError) {
  let error: Error = null;
  console.log(error);
  switch (e.code) {
    case 'EMAIL_ALREADY_EXISTS': {
      error = new BadRequestException();
    }
    default: {
      error = new BadRequestException();
    }
  }
  throw error;
}
