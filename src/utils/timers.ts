export const sleep = (ms: number = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms))
