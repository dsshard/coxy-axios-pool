import { isValidNumber } from './is-valid-number'

export function isPositiveNumber (value: any): boolean {
  return isValidNumber(value) && value > 0
}
