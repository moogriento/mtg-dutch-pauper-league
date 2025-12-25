import { Outlet, ScrollRestoration, useNavigation } from 'react-router';
import { Navbar } from '../feat-navigation/NavigationMenu';
import { Footer } from '../feat-navigation/Footer';
import { LoadingBar } from '../feat-navigation/LoadingBar';

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
