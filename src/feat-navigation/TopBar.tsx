import { SwitchTheme } from '../feat-switch-theme/SwitchTheme';

export function TopBar() {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-5xl mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-xs text-gray-600 dark:text-gray-400">Welcome!</div>
        <div className="flex items-center gap-3">
          {/* <div className="text-xs text-gray-600 dark:text-gray-400">
            English ▼
          </div> */}
          <SwitchTheme />
        </div>
      </div>
    </div>
  );
}
