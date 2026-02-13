import { PrismaClient } from '@prisma/client';

// Serverless ortamda pool yönetimini platforma bırakır; global singleton ile tekrar kullanım sağlar.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['error', 'warn']
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}
