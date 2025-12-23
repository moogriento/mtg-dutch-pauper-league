import { Link } from 'react-router';

export function NoResults() {
  return (
    <div className="mx-auto text-center">
      <div className="text-[6rem] mt-8 mb-4 text-text-primary">¯\_(ツ)_/¯</div>
      <div className="font-medium text-xl">No decks found</div>
      <div className="text-md mb-4">
        Your search didn't match any decks. Perhaps try adjusting your filters.
      </div>
      <Link to={-1 as any} className="underline">
        Go back
      </Link>
    </div>
  );
}
