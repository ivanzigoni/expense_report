import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../repository/user.repository';
import { UserService } from './user.service';
import { user1 } from '../../expense/repository/test-assets/mock';
import { ForbiddenException } from '@nestjs/common';

describe('UserService', () => {

  const repositoryFactory = () => ({})

  let userService: UserService;
  let userRepository: UserRepository;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, {
        provide: UserRepository,
        useFactory: repositoryFactory
      }],
    }).compile();

    userRepository = module.get(UserRepository)
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('create should return inserted entity if successful', async () => {
    userRepository.findOneByEmail = jest.fn().mockImplementation(() => { throw new Error() })

    userRepository.create = jest.fn().mockImplementation(() => user1)

    const result = await userService.create({
      email: user1.email,
      lastName: user1.lastName,
      firstName: user1.firstName,
      password: user1.password
    });

    expect(result).toEqual(user1);

  });

  it('create should throw if email already in use', async () => {
    userRepository.findOneByEmail = jest.fn().mockImplementation(() => user1)

    try {
      await userService.create({
        email: user1.email,
        lastName: user1.lastName,
        firstName: user1.firstName,
        password: user1.password
      });
    } catch (err) {
      expect(err).toBeInstanceOf(ForbiddenException);
    }

  });
});
