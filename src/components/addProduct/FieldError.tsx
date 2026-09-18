export function FieldError({ error }: { error: string | undefined }) {
  if (!error) return null;

  return <p className="text-xs text-destructive">{error}</p>;
}