import { useEffect, useState } from 'react';
import styles from './SwitchTheme.module.css';

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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleChange();
    }
  };

  return (
    <div
      className={styles['theme-toggle']}
      onClick={handleChange}
      role="switch"
      aria-checked={theme === 'dark'}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <span className={styles.sun} aria-hidden="true">
        ☀️
      </span>
      <div
        className={`${styles.switch} ${
          theme === 'dark' ? styles.switchActive : ''
        }`}
      >
        <div className={styles['switch-toggle']}></div>
        <span className={styles['sr-only']}>
          {theme === 'light' ? 'Light mode' : 'Dark mode'}
        </span>
      </div>
      <span className={styles.moon} aria-hidden="true">
        🌙
      </span>
    </div>
  );
}
