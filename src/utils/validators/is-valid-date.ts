export function isValidDate (value: string): boolean {
  const parsedDate = Date.parse(value)
  return !isNaN(parsedDate)
}
