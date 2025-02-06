export function handleMaxLength(e: React.ChangeEvent<HTMLInputElement>) {
  const { value, maxLength } = e.target ?? {};
  if (value.length > maxLength) e.target.value = value.slice(0, maxLength);
}
