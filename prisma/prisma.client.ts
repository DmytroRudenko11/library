import { PrismaClient } from '@prisma/client';

declare global {
    namespace NodeJS {
        interface Global {
            prisma?: PrismaClient;
        }
    }
}

const prisma: PrismaClient = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development' && !global.prisma) {
    global.prisma = prisma;
}

export default prisma;