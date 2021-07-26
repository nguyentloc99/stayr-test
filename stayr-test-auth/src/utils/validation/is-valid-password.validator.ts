import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsValidPassword(validationOptions: ValidationOptions = {}) {
  return function (object: unknown, propertyName: string) {
    validationOptions.message =
      validationOptions.message ||
      'Password must be between 8 - 20 characters, and include uppercase, lowercase, number and special character';
    registerDecorator({
      name: 'is-valid-password',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') {
            return false;
          }
          const passwordRegExp =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?\s])[A-Za-z\d#$@!%&*?\s]{8,20}$/;
          return passwordRegExp.test(value);
        },
      },
    });
  };
}
