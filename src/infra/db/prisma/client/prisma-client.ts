import { PrismaClient, Prisma as PrismaSchema } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'warn', 'error'],
  errorFormat: process.env.NODE_ENV === 'development' ? 'pretty' : 'minimal',
});

export default prisma;

export const Prisma = PrismaSchema;
