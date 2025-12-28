import { useNavigate } from 'react-router';
import { Label } from '../../common-ui/Label';
import { Input } from '../../common-ui/Input';
import { Combobox } from '../../common-ui/ComboBox';
import { archetypes } from '../../domain-models/archetype';
import { ScryfallCardSearch } from '../../feat-scryfall-card-search/CardSearch';
import { useState } from 'react';
import { H1 } from '../../common-ui/Headings';
import { useQuery } from '../../helper-query/useQuery';
import type { Tournament } from '../../domain-models/tournament';
import { supabase } from '../../helper-api/supabase';

export function SearchPage() {
  const navigate = useNavigate();
  const [cardName, setCardName] = useState('');
  const [minCardCount, setMinCardCount] = useState('');
  const [tournament, setTournament] = useState('');
  const [archetype, setArchetype] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const { data: tournaments } = useQuery({
    queryKey: ['tournaments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tournament')
        .select()
        .order('start_date', {
          ascending: false,
        });

      if (error) {
        throw error;
      }

      return data as Tournament[];
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = new URLSearchParams();

    if (cardName.trim()) {
      url.append('cardName', cardName);
    }

    if (minCardCount.trim()) {
      url.append('minCardCount', minCardCount);
    }

    if (tournament) {
      url.append('tournament', tournament);
    }

    if (archetype) {
      url.append('archetype', archetype);
    }

    if (fromDate) {
      url.append('startDate', fromDate);
    }

    if (toDate) {
      url.append('endDate', toDate);
    }

    navigate(`/search?${url.toString()}`);
    return;
  };

  return (
    <div className="my-8">
      <H1>Search decks</H1>
      <p className="text-sm my-4">
        Search decks that have been registered in previous tournaments. You can
        search decks that contain a specific card (or a minimum quantity); have
        been used in a specific tournament or within a range of dates; or by its
        archetype
      </p>
      <p className="italic text-sm mb-4">
        Remember: The archetype algorithm might not be 100% accurate
      </p>
      <form onSubmit={handleSubmit}>
        <div className="border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card Name */}
            <div>
              <Label>Card Name</Label>
              <ScryfallCardSearch onChange={setCardName} />
            </div>

            {/* Quantity */}
            <div>
              <Label>Minimum Count</Label>
              <Input
                type="number"
                value={minCardCount}
                placeholder="1"
                min="1"
                max="4"
                onChange={(e) => {
                  setMinCardCount(e.target.value);
                }}
              />
            </div>

            {/* Tournament */}
            <div>
              <Label>Tournament</Label>
              <Combobox
                items={tournaments ?? []}
                placeholder="Select tournament..."
                onChange={setTournament}
                itemKey="id"
                itemLabel="name"
              />
            </div>

            {/* Archetype */}
            <div>
              <Label>Deck archetype</Label>
              <Combobox
                items={archetypes}
                placeholder="Select archetype..."
                onChange={setArchetype}
                itemKey="id"
                itemLabel="name"
              />
            </div>

            {/* Start Date */}
            <div>
              <Label>From date</Label>
              <Input
                type="date"
                value={fromDate}
                onChange={(e) => {
                  setFromDate(e.target.value);
                }}
              />
            </div>

            {/* End Date */}
            <div>
              <Label>To date</Label>
              <Input
                type="date"
                value={toDate}
                onChange={(e) => {
                  setToDate(e.target.value);
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm">
              Search Decks
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
