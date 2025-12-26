export function LoadingBar() {
  return (
    <div className="fixed top-0 left-0 right-0 h-[8px] z-50 overflow-hidden">
      <div className="h-full w-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 dark:from-blue-500 dark:via-blue-600 dark:to-blue-500 animate-pulse" />
    </div>
  );
}
