import bcrypt from 'bcrypt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

describe('AuthService (unit)', () => {
  let service: AuthService;
  const mockJwtService = { sign: jest.fn().mockReturnValue('signed-token') };
  const mockPrisma = {
    user: { findUnique: jest.fn() },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return token when credentials are valid', async () => {
    const hashed = bcrypt.hashSync('admin', 10);
    mockPrisma.user.findUnique.mockResolvedValue({
      id: '1',
      name: 'Tester',
      email: 'teste@user.com',
      password: hashed,
    });

    const res = await service.login({
      email: 'teste@user.com',
      password: 'admin',
    });
    expect(res).toEqual({ access_token: 'signed-token' });
    expect(mockJwtService.sign).toHaveBeenCalledWith({
      name: 'Tester',
      email: 'teste@user.com',
    });
  });
});
