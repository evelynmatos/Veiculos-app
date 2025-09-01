export function removeSpaces(value: string): string {
  return value?.replace(/\s/g, '') ?? '';
}