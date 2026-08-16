export default function HomeBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Gold blobs */}
      <div className="absolute -top-32 -left-32 w-150 h-150 bg-[#dd9e5e]/6 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-125 h-125 bg-[#dd9e5e]/4 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-100 bg-[#dd9e5e]/2.5 rounded-full blur-3xl" />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-size-[72px_72px]" />
    </div>
  );
}
