export function isNumberInRange (value: number, min: number, max: number): boolean {
  return Number(value) >= min && Number(value) <= max
}
