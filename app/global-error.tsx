"use client";

export default function GlobalError({ error }: { error: Error }) {
  return (
    <div className="flex flex-col gap-4 py-4">
      <h1>Erro</h1>
      <p>{error.message}</p>
    </div>
  );
}
