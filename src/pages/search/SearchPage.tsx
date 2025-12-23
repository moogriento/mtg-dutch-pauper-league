import { Label } from '../../common-ui/Label';
import { Input } from '../../common-ui/Input';
import { Combobox } from '../../common-ui/ComboBox';

const tournaments = [
  {
    id: 1,
    name: 'Dutch Pauper League Leg 9 - 2025',
  },
  {
    id: 2,
    name: 'Dutch Pauper League Leg 8 - 2025',
  },
  {
    id: 3,
    name: 'Dutch Pauper League Leg 9 - 2024',
  },
];

export function SearchPage() {
  return (
    <div className="my-8">
      <form>
        <div className="rounded-lg border p-6 bg-bg-primary border-border shadow-shadow-card">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Label>Card Name</Label>
                <Input placeholder="e.g., Lightning Bolt" />
              </div>

              <div>
                <Label>Minimum Count</Label>
                <Input type="number" min="1" max="4" />
              </div>
            </div>

            {/* Tournament and Archetype Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label>Tournament</Label>
                <Combobox
                  items={tournaments}
                  placeholder="Select tournament..."
                  itemKey="id"
                  itemLabel="name"
                />
              </div>
              <div className="md:col-span-2">
                <Label>Deck archetype</Label>
                <Combobox
                  items={tournaments}
                  placeholder="Select archetype..."
                  itemKey="id"
                  itemLabel="name"
                />
              </div>
            </div>

            {/* Date Range Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>From Date</Label>
                <Input type="date" />
              </div>

              <div>
                <Label>To Date</Label>
                <Input type="date" />
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
