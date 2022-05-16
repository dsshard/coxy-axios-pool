export default function searchArrayFilter (array: any[], searchString: string, _fields: any) {
  if (!searchString) {
    return array
  }
  const reg = new RegExp(encodeURI(String(searchString).toLowerCase()), 'ig')
  return array.filter((sub: string) => {
    const fields = typeof _fields === 'function' ? _fields(sub) : _fields.map((field) => sub[field])

    return fields.some((field) => {
      return !!encodeURI(String(field).toLowerCase()).match(reg)
    })
  })
}
