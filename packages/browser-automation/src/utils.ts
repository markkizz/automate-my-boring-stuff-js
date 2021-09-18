export function eventLog(event: string, message: string, status = "") {
  const now = new Date().toLocaleString()
  const format = `[eventinfo] ${message} ${now} - ${event} ${status}`
  console.info(format)
}

export function randomBetweenNumber(max: number, min: number) {
  const rand = Math.random() * (max - min + 1) + min
  const randTwoDegit = rand.toFixed(1)
  return randTwoDegit
}