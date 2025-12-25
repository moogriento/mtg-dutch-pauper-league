import { Outlet, ScrollRestoration, useNavigation } from 'react-router';
import { Navbar } from '../feat-menu/NavigationMenu';
import { Footer } from '../feat-menu/Footer';
import { LoadingBar } from '../helper-page/LoadingBar';

export function RootLayout() {
  const navigation = useNavigation();

  return (
    <>
      <Navbar />
      {navigation.state === 'loading' && <LoadingBar />}

      <main className="mx-auto max-w-5xl px-2 md:px-4">
        <ScrollRestoration />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
