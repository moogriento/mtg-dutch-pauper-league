import { supabase } from '../helper-api/supabase';
import { useQuery } from '../helper-query/useQuery';

export type ArchetypeStats = {
  archetype: string;
  total_decks: number;
  total_wins: number;
  total_losses: number;
  total_draws: number;
  conversion_rate?: number;
  win_rate?: number;
};

export interface TournamentStats {
  totalDecks: number;
  mostPlayedArchetype: string;
  bestConvertingArchetype: string;
  totalUniqueArchetypes: number;
  archetypes: ArchetypeStats[];
}

export function useTournamentStats(tournamentId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['tournament-stats', tournamentId],
    queryFn: async () => {
      const [allDecks, top8] = await Promise.all([
        supabase.rpc('get_archetype_stats', {
          tournament_id_text: tournamentId,
        }),
        supabase.rpc('get_archetype_stats', {
          tournament_id_text: tournamentId,
          top: 8,
        }),
      ]);

      if (allDecks.error || top8.error) {
        throw allDecks.error || top8.error;
      }

      return {
        allDecks: allDecks.data as ArchetypeStats[],
        top8: top8.data as ArchetypeStats[],
      };
    },
  });

  // calculate the conversition rate.
  // The conversion rate is the percentage of decks
  // that made it to the top 8 compared to the total number of decks.
  const top8record: Record<string, number> =
    data?.top8.reduce((acc, deck) => {
      acc[deck.archetype] = deck.total_decks || 0;
      return acc;
    }, {} as Record<string, number>) ?? {};

  let highestConversionRate = 0;
  let bestConvertingArchetype = '';

  data?.allDecks.forEach((deck) => {
    const top8Count = top8record[deck.archetype] || 0;

    const conversionRate =
      deck.total_decks && deck.total_decks > 0
        ? (top8Count / deck.total_decks) * 100
        : 0;
    deck.conversion_rate = conversionRate;

    const totalGames = deck.total_wins + deck.total_losses + deck.total_draws;
    const winRate = totalGames > 0 ? (deck.total_wins / totalGames) * 100 : 0;
    deck.win_rate = winRate;

    if (conversionRate > highestConversionRate) {
      highestConversionRate = conversionRate;
      bestConvertingArchetype = deck.archetype;
    }
  });

  const totalDecks =
    data?.allDecks?.reduce(
      (sum: number, deck) => sum + (deck.total_decks || 0),
      0
    ) ?? 0;

  const mostPlayedArchetype = data?.allDecks[0].archetype;
  const totalUniqueArchetypes = data?.allDecks.length ?? 0;

  const stats = {
    totalDecks,
    mostPlayedArchetype,
    bestConvertingArchetype,
    totalUniqueArchetypes,
    archetypes: data?.allDecks || [],
  } as TournamentStats;

  return {
    data: {
      stats,
    },
    isLoading,
  };
}
