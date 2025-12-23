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
      <div className="animate-pulse">
        <div className="mb-4 mx-auto rounded-full w-[250px] h-[250px] bg-border/60 dark:bg-border" />
        <div>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="inline-flex items-center mr-4 text-sm">
              <div className="w-[14px] h-[14px] rounded-full inline-block mr-1 bg-border/60 dark:bg-border" />
              <div className="w-36 h-5 bg-border/60 dark:bg-border rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <PieChart data={chartData} size={250} />;
}
