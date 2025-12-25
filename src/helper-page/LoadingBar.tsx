export function LoadingBar() {
  return (
    <div className="fixed top-0 left-0 right-0 h-[8px] z-50 overflow-hidden">
      <div className="h-full w-full bg-sky-500 animate-pulse" />
    </div>
  );
}
