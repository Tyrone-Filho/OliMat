import "server-only";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const u = new URL(process.env.DATABASE_URL!);
const Local = ["127.0.0.1", "localhost", "::1"].includes(u.hostname);

const adapter = new PrismaMariaDb({
  host: u.hostname,
  port: Number(u.port || 3306),
  user: decodeURIComponent(u.username),
  password: decodeURIComponent(u.password),
  database: u.pathname.slice(1),
  connectionLimit: 5,
  allowPublicKeyRetrieval: process.env.NODE_ENV !== "production",
  ssl: Local ? undefined : true
});

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;