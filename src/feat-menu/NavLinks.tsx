import { Link } from 'react-router';
export function NavLinks() {
  const base = 'text-text-secondary hover:text-text-primary transition';

  return (
    <>
      <Link className={base} to="/">
        Legs
      </Link>
      <Link className={base} to="/advanced">
        Search Decks
      </Link>
    </>
  );
}
