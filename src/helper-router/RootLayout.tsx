import { Outlet, Link } from 'react-router';
import { SwitchTheme } from '../feat-switch-theme/SwitchTheme';

export function RootLayout() {
  return (
    <>
      <header
        className="container max-w-screen"
        style={{ padding: 12, borderBottom: '1px solid #eee' }}
      >
        <nav>
          <Link to="/">Overview</Link>
        </nav>

        <SwitchTheme />
      </header>
      <main className="container max-w-screen" style={{ padding: 12 }}>
        <Outlet />
      </main>
    </>
  );
}
