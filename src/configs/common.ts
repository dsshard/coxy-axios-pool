import assert from 'assert'

export const ENV = process.env.NODE_ENV

assert(process.env.NODE_ENV, 'NODE_ENV not found')
