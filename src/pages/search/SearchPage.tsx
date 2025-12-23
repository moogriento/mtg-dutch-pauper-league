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
        search decks that contain a specific card (or a quantity), used in a
        specific tournamen or within a range of dates, or by its archetype
      </p>
      <form onSubmit={handleSubmit}>
        <div className="rounded-lg border p-6 bg-bg-primary border-border shadow-shadow-card">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Label>Card Name</Label>
                <ScryfallCardSearch onChange={setCardName} />
              </div>

              <div>
                <Label>Minimum Count</Label>
                <Input
                  type="number"
                  value={minCardCount}
                  min="1"
                  max="4"
                  onChange={(e) => {
                    setMinCardCount(e.target.value);
                  }}
                />
              </div>
            </div>

            {/* Tournament and Archetype Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label>Tournament</Label>
                <Combobox
                  items={tournaments ?? []}
                  placeholder="Select tournament..."
                  onChange={setTournament}
                  itemKey="id"
                  itemLabel="name"
                />
              </div>
            </div>

            {/* Date Range Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label>Deck archetype</Label>
                <Combobox
                  items={archetypes}
                  placeholder="Select archetype..."
                  onChange={setArchetype}
                  itemKey="id"
                  itemLabel="name"
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-sans font-medium transition-all bg-accent text-[#fff] hover:bg-accent-hover"
              >
                Search Decks
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
