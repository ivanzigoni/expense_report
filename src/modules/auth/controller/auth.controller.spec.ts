import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../database/user/service/user.service';
import { AuthService } from '../service/auth.service';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;

  const userServiceFactory = () => ({})
  const authServiceFactory = () => ({})

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{
        provide: UserService,
        useFactory: userServiceFactory
      },
    {
      provide: AuthService,
      useFactory: authServiceFactory
    }]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
