import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsPasswordMatch(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPasswordMatch',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const relatedValue = (args.object as any)[args.constraints[0]];
          return (
            typeof value === 'string' &&
            typeof relatedValue === 'string' &&
            value === relatedValue
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `${propertyName} must match ${args.constraints[0]}`;
        },
      },
    });
  };
}
