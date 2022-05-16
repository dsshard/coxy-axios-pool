import jwt from 'jsonwebtoken'

import { JWT_SALT_TOKEN, JWT_EXPIRED } from 'configs/jwt'

export const jwtSign = (data?: any, time?: string): string => jwt.sign(data, JWT_SALT_TOKEN, {
  expiresIn: time || JWT_EXPIRED
})

export const jwtVerify = (token = ''): boolean => {
  try {
    jwt.verify(token, JWT_SALT_TOKEN)
    return true
  } catch (ignore) {
    return false
  }
}

export const jwtDecode = (token = ''): any => {
  try {
    return jwt.verify(token, JWT_SALT_TOKEN)
  } catch (ignore) {
    return null
  }
}
