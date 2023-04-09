import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseManagerService } from './expense-manager.service';
import { Queue } from "bull";

describe('ExpenseManagerService', () => {
  
  const bullMockFactory = () => ({
    
  }) as Queue


  let service: ExpenseManagerService;
  let queue: Queue;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseManagerService, {
        provide: "BullQueue_mailqueue",
        useFactory: bullMockFactory
      }],
    }).compile();

    queue = module.get("BullQueue_mailqueue");
    service = module.get<ExpenseManagerService>(ExpenseManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
