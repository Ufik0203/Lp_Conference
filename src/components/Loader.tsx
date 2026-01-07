const Loader = () => {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-neutral-dark text-white">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white" />
        <div className="text-sm opacity-80">Loading…</div>
      </div>
    </div>
  );
}

export default Loader;
