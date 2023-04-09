import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user.entity';
import { UserRepository } from './user.repository';
import { user1, user2 } from '../../expense/repository/test-assets/mock';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../user.dto';

describe('User Repository', () => {
  type MockType<T> = {
    [P in keyof T]?: jest.Mock<{}>;
  };

  const repositoryMockFactory: () => MockType<Repository<UserEntity>> = jest.fn(
    () => ({
      findOne: jest.fn(() => {
        return {};
      }),
      find: jest.fn(() => {
        return {};
      }),
      create: jest.fn(() => {
        return {};
      }),
      update: jest.fn(() => {
        return {};
      }),
      save: jest.fn(() => {
        return {};
      }),
      merge: jest.fn(() => {
        return {};
      }),
      delete: jest.fn(() => {
        return {};
      }),
      findOneOrFail: jest.fn(() => {
        return {};
      }),
    }),
  );

  let userRepository: UserRepository;
  let repoMock: MockType<Repository<UserEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    repoMock = module.get(getRepositoryToken(UserEntity));
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  it('findAll should return full list of users', async () => {
    repoMock.find.mockImplementation(() => [user1, user2]);

    const users = await userRepository.findAll();

    expect(users).toHaveLength([user1, user2].length);
  });

  it('findOneByEmail must return user by email', async () => {
    repoMock.findOne.mockImplementation(() => user1);

    const user = await userRepository.findOneByEmail(user1.email);

    expect(user).toEqual(user1);
  });

  it('findOneById must return user by id', async () => {
    repoMock.findOneOrFail.mockImplementation(() => user1);

    const user = await userRepository.findOneById(user1.id);

    expect(user).toEqual(user1);
  });

  it('findOneById must throw if user not found', async () => {
    repoMock.findOneOrFail.mockImplementation(() => {
      throw new Error();
    });

    try {
      await userRepository.findOneById(user1.id);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });

  it('findOneById must return the user if found', async () => {
    repoMock.findOneOrFail.mockImplementation(() => user1);

    const user = await userRepository.findOneById(user1.id);

    expect(user).toEqual(user1);
  });

  it('findOneByEmail must return user by email', async () => {
    repoMock.findOne.mockImplementation(() => user1);

    const user = await userRepository.findOneByEmail(user1.email);

    expect(user).toEqual(user1);
  });

  it('findOneByEmail must throw if user not found', async () => {
    repoMock.findOne.mockImplementation(() => {
      throw new NotFoundException();
    });

    try {
      await userRepository.findOneByEmail(user1.email);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });

  it('create must return created user', async () => {
    const createUserDto: CreateUserDto = {
      email: user1.email,
      firstName: user1.firstName,
      lastName: user1.lastName,
      password: user1.password,
    };

    repoMock.create.mockImplementation(() => user1);
    repoMock.save.mockImplementation(() => user1);

    const user = await userRepository.create(createUserDto);

    expect(user).toEqual(user1);
  });
});
