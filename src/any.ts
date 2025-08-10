export const PromiseAny = <T>(tasks: readonly Promise<T>[]): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    if (tasks.length === 0) {
      reject(new Error('All Promises rejected'))
      return
    }

    const errors: unknown[] = []
    let failureCount = 0

    for (const task of tasks) {
      Promise.resolve(task)
        .then(resolve)
        .catch((err) => {
          errors.push(err)
          failureCount++
          if (failureCount === tasks.length) {
            reject(new Error(errors.join('\n')))
          }
        })
    }
  })
}
