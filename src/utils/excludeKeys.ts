// Exclude keys from a object

export function exclude<T, Key extends keyof T>(object: T, keys: Key[]): Omit<T, Key> {
  return Object.fromEntries(
    Object.entries(object as any).filter(([key]: any) => !keys.includes(key))
  ) as Omit<T, Key>;
}
