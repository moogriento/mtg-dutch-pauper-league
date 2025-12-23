import { Outlet } from 'react-router';
import { Navbar } from '../feat-menu/NavigationMenu';
import { Footer } from '../feat-menu/Footer';

export function RootLayout() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-2 md:px-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
