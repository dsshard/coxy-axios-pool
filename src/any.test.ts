import { PromiseAny } from './any'

test('check simple', async () => {
  const promises = [Promise.resolve(1), Promise.reject(2)]
  const result = await PromiseAny(promises)
  expect(result).toBe(1)
})

test('check border case #1', async () => {
  const promises = [Promise.resolve(1)]
  const result = await PromiseAny(promises)
  expect(result).toBe(1)
})

test('check border case #2', async () => {
  const promises = []
  await expect(PromiseAny(promises)).rejects.toThrow('All Promises rejected')
})

test('check border case #2', async () => {
  const promises = [Promise.reject(2), Promise.reject(3)]
  await expect(PromiseAny(promises)).rejects.toThrow('2')
})
