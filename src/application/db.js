import { PrismaClient } from "@prisma/client";
import logger from "winston";

export const prisma = new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
      {
        emit: 'event',
        level: 'error',
      },
      {
        emit: 'event',
        level: 'info',
      },
      {
        emit: 'event',
        level: 'warn',
      },
    ],
  });

prisma.$on('query', (e) => {
    logger.info(`Query: ${e.query} Duration: ${e.duration}ms`);
  });
  prisma.$on('error', (e) => {
    logger.error(`Error: ${e.message}`);
  });
  prisma.$on('info', (e) => {
    logger.info(`Info: ${e.message}`);
  });
  prisma.$on('warn', (e) => {
    logger.warn(`Warn: ${e.message}`);
  });