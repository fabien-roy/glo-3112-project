import { factory } from 'node-factory';
import { UserCreationParams } from '../types/users';

export const UserCreationParamsFactory = factory<UserCreationParams>(
  (fake) => ({
    username: fake.internet.userName(),
    email: fake.internet.email(),
    phoneNumber: fake.phone.phoneNumber('###-###-####'),
    firstName: fake.name.firstName(),
    lastName: fake.name.lastName(),
  }),
);
