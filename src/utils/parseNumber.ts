export function parseNumber(value: FormDataEntryValue | null) {
  return value ? parseInt(value.toString(), 10) : null
}