import { Link } from 'react-router';
export function NavLinks({ onClick }: { onClick?: () => void }) {
  const base =
    'text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 hover:underline dark:hover:text-blue-300 font-normal';

  return (
    <>
      <Link className={base} to="/" onClick={onClick}>
        Tournaments
      </Link>
      <Link className={base} to="/advanced" onClick={onClick}>
        Search Decks
      </Link>
    </>
  );
}
