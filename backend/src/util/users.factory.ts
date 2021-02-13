import { factory } from 'node-factory';
import { User, UserCreationRequest } from '../types/users';

export const UserFactory = factory<User>((fake) => ({
  username: fake.internet.userName(),
  email: fake.internet.email(),
  phoneNumber: fake.phone.phoneNumber(),
  firstName: fake.name.firstName(),
  lastName: fake.name.lastName(),
  description: fake.lorem.words(10),
  avatarReference: fake.random.uuid(),
}));

export const UserCreationRequestFactory = factory<UserCreationRequest>(
  (fake) => ({
    username: fake.internet.userName(),
    email: fake.internet.email(),
    phoneNumber: fake.phone.phoneNumber(),
    firstName: fake.name.firstName(),
    lastName: fake.name.lastName(),
  }),
);
