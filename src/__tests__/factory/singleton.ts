import { mockDeep } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy } from 'jest-mock-extended/lib/cjs/Mock';
import 'reflect-metadata';
import 'main/container';

import prisma from 'infra/db/prisma/client/prisma-client';

jest.mock('infra/db/prisma/client/prisma-client', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
