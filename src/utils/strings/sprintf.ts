export function sprintf (template: string, ...values: any[]): string {
  return template.replace(/%s/g, function () {
    return values.shift()
  })
}
