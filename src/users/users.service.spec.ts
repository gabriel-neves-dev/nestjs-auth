import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersService (unit)', () => {
  let service: UsersService;
  const mockPrisma = {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should hash password and call prisma.create', async () => {
    mockPrisma.user.create.mockImplementation(async (args) => args.data);
    const dto = {
      name: 't',
      email: 't@t.com',
      password: 'admin',
      role: 'READER',
    } as any;
    const created = await service.create(dto);
    expect(mockPrisma.user.create).toHaveBeenCalled();
    expect(created.password).not.toBe('admin');
    expect(created.email).toBe('t@t.com');
  });
});
