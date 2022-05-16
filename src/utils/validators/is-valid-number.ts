export function isValidNumber (value: any): boolean {
  return !isNaN(parseFloat(value)) && !isNaN(Number(value))
}
