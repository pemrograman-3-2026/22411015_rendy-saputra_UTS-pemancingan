import "dotenv/config"
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from "../generated/prisma/index.js"
const adapter = new PrismaMariaDb({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'uts_toko_pemancingan',
})
export const prisma = new PrismaClient({ adapter })
