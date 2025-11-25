import request from 'supertest';
import bcrypt from 'bcrypt';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AuthModule } from '../src/auth/auth.module';
import { PrismaService } from '../src/prisma/prisma.service';

const mockPrisma = {
  user: {
    findUnique: jest.fn(),
  },
};

describe('Auth e2e (with mocked Prisma)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      // registra o mock como provider do módulo de teste
      providers: [{ provide: PrismaService, useValue: mockPrisma }],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('POST /auth/login -> 201 and returns token for valid credentials', async () => {
    const hashed = bcrypt.hashSync('admin', 10);
    mockPrisma.user.findUnique.mockResolvedValue({
      id: '1',
      name: 'Tester',
      email: 'teste@user.com',
      password: hashed,
    });

    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'teste@user.com', password: 'admin' });

    expect(res.status).toBe(201);
    expect(res.body.access_token).toBeDefined();
  });

  it('POST /auth/login -> 4xx/5xx when user not found or bad credentials', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);

    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'noone@x.com', password: 'admin' });

    expect(res.status).toBeGreaterThanOrEqual(400);
  });
});