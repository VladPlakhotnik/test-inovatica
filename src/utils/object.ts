export const omit = <D>(
  obj: Record<string, D>,
  key: string,
): Record<string, D> => {
  return Object.fromEntries(Object.entries(obj).filter(([k]) => k !== key))
}
