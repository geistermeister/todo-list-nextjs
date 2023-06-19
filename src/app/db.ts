import { PrismaClient } from '@prisma/client'

const globalPrima = global as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalPrima.prisma ?? new PrismaClient({ log: ['query'] })

if (process.env.NODE_ENV !== 'production') globalPrima.prisma = prisma