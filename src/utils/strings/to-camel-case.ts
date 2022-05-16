export function toCamelCase (str: string): string {
  return str.replace(/-([a-z])/ig, (word, letter: string) => letter.toUpperCase())
}
