export default function uniqBy (array: any[], getter: (item: any) => any) {
  const result = []
  const map = new Map()
  for (const item of array) {
    const id = getter(item)
    if (!map.has(id)) {
      map.set(id, true)
      result.push(item)
    }
  }
  return result
}
