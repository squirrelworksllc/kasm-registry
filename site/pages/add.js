export default function NewPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-extrabold tracking-tight text-[#d0d0d0]">New</h1>
      <div className="mt-4 rounded-xl border border-white/10 bg-[#1f242b] p-6 text-[#d0d0d0]">
        <div className="font-semibold text-white">Add this registry to Kasm</div>
        <ul className="mt-2 list-disc pl-5 text-sm text-[#a0a0a0]">
          <li>In Kasm, add a Workspace Registry using the root URL.</li>
          <li>Use the copy button on the Library page for the correct URL.</li>
        </ul>
      </div>
    </main>
  );
}
