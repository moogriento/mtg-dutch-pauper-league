import { PieChart } from '../feat-pie-chart/PieChart';
import type { ArchetypeStats } from './useTournamentStats';

function getChartColors() {
  const root = document.documentElement;
  const style = getComputedStyle(root);

  return [
    style.getPropertyValue('--chart-1').trim() || '#2563EB',
    style.getPropertyValue('--chart-2').trim() || '#DC2626',
    style.getPropertyValue('--chart-3').trim() || '#059669',
    style.getPropertyValue('--chart-4').trim() || '#D97706',
    style.getPropertyValue('--chart-5').trim() || '#7C3AED',
    style.getPropertyValue('--chart-6').trim() || '#DB2777',
    style.getPropertyValue('--chart-7').trim() || '#0891B2',
    style.getPropertyValue('--chart-8').trim() || '#CA8A04',
    style.getPropertyValue('--chart-9').trim() || '#64748B',
  ];
}

// TODO: use archetypes colors
const chartColors = getChartColors();

const topDivider = 8;

interface Props {
  archetypes: ArchetypeStats[];
  totalDecks: number;
  loading?: boolean;
}

export function MetaChart({ archetypes, totalDecks, loading }: Props) {
  const topArchetypes = archetypes.slice(0, topDivider);
  const others = archetypes.slice(topDivider);

  const othersTotal = others.reduce((sum, arch) => sum + arch.total_decks, 0);

  const chartData = topArchetypes.map((archetype, index) => ({
    label: archetype.archetype,
    value: archetype.total_decks / totalDecks,
    color: chartColors[index],
  }));

  chartData.push({
    label: 'Others',
    value: othersTotal / totalDecks,
    color: chartColors[topDivider],
  });

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="mx-auto w-[250px] h-[250px] rounded-full bg-gray-200 dark:bg-gray-700" />

        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="inline-flex items-center mr-4 text-sm gap-2"
            >
              <div className="w-3.5 h-3.5 rounded-full bg-gray-300 dark:bg-gray-600" />
              <div className="w-36 h-5 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <PieChart data={chartData} size={250} />;
}
