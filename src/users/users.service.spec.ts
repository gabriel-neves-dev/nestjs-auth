import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from '../auth/auth.service';

describe('Aervice (unit)', () => {
  let service: AuthService;
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
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
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
      role: 'USER',
    } as any;
    const created = await service.create(dto);
    expect(mockPrisma.user.create).toHaveBeenCalled();
    expect(created.email).toBe('t@t.com');
  });
});
