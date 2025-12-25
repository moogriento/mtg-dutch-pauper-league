import { Link } from 'react-router';
export function NavLinks({ onClick }: { onClick?: () => void }) {
  const base = 'text-text-secondary hover:text-text-primary transition';

  return (
    <>
      <Link className={base} to="/" onClick={onClick}>
        Legs
      </Link>
      <Link className={base} to="/advanced" onClick={onClick}>
        Search Decks
      </Link>
    </>
  );
}
