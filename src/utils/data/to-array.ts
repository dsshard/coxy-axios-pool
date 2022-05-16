export function toArray (any: any): any[] {
  return Array.isArray(any) ? any : [any]
}
