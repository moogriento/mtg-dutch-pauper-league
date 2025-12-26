import { useEffect, useState } from 'react';
import { Swamp } from './Swamp';
import { Plains } from './Plains';

function getInitialTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Use saved preference, otherwise use system preference
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
  return theme;
}

const initialTheme = getInitialTheme();

export function SwitchTheme() {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const handleChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <button
      onClick={handleChange}
      className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-yellow-300 hover:bg-gray-200 dark:hover:bg-gray-600 text-xs transition-colors"
    >
      {theme === 'dark' ? (
        <div className="rounded-full shadow-xl p-0 bg-yellow-200">
          <Plains className="size-[14px]" />
        </div>
      ) : (
        <div className="rounded-full shadow-xl shadow-stone-200/50 p-0 bg-stone-200">
          <Swamp className="size-[14px]" />
        </div>
      )}
      <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
    // <button
    //   onClick={handleChange}
    //   className="relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    //   style={{ backgroundColor: theme === 'dark' ? '#334155' : '#e2e8f0' }}
    //   aria-label="Toggle theme"
    // >
    //   <span
    //     className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center ${
    //       theme === 'dark' ? 'translate-x-7' : 'translate-x-0'
    //     }`}
    //   >
    //     {theme === 'dark' ? (
    //       <div className="rounded-full shadow-xl shadow-stone-200/50 p-1 bg-stone-200">
    //         <Swamp className="size-[14px]" />
    //       </div>
    //     ) : (
    //       <div className="rounded-full shadow-xl p-1 bg-yellow-200">
    //         <Plains className="size-[14px]" />
    //       </div>
    //     )}
    //   </span>
    // </button>
  );
}
