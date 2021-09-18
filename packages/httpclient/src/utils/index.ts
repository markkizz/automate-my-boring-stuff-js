export function isFalsyValue<TValue = any>(value: TValue) {
  return value === undefined && value === null
}