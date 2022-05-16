import assert from 'assert'

const ssl = process.env.PG_SSL === 'true'

export const databaseConfig = {
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB_NAME,
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  ssl,
  dialect: 'postgres',
  pool: {
    max: 16,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}

assert(process.env.PG_USERNAME, 'PG_USERNAME not found')
assert(process.env.PG_PASSWORD, 'PG_PASSWORD not found')
assert(process.env.PG_DB_NAME, 'PG_DB_NAME not found')
assert(process.env.PG_HOST, 'PG_HOST not found')
assert(process.env.PG_PORT, 'PG_PORT not found')
