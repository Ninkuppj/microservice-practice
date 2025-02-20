import { Test } from '@nestjs/testing';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData123123', () => {
    it('should return "Hello API123"', () => {
      expect(service.getData()).toEqual({message: 'Hello API123'});
    });
  });
});
