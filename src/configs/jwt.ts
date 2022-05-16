import assert from 'assert'

export const JWT_SALT_TOKEN = process.env.JWT_SALT_TOKEN
export const JWT_EXPIRED = process.env.JWT_EXPIRED

assert(process.env.JWT_SALT_TOKEN, 'JWT_SALT_TOKEN not found')
assert(process.env.JWT_EXPIRED, 'JWT_EXPIRED not found')
