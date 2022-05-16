import Big from 'big.js'

export const times = (number, value): string => Big(number).times(value).toString()
export const div = (number, value): string => Big(number).div(value).toString()
export const minus = (first, ...args): string => args.reduce((acc, value) => acc.minus(value), Big(first)).toString()
export const toFixed = (number, decimals): string => Big(number).toFixed(decimals).toString()
