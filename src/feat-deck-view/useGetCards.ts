import { useQuery } from '../helper-query/useQuery';
import type { Deck, EnrichedCard, ViewableDeck } from '../domain-models/deck';
import { fetchCardsByDeck } from '../helper-api/scryfall';

export function useGetCards(data: Deck) {
  return useQuery({
    queryKey: ['deck-details', data.id],
    queryFn: async () => {
      const deck = data.deck_obj;

      // curate deck obj:
      // From namre curate //
      // keep the count of each card in mainboard and sideboard
      // remove any extraneous data

      const sanitiseCardName = (name: string) => {
        return name.split(' //')[0].trim();
      };

      const scryfallIdentifiers = {
        identifiers: [
          ...Object.keys(deck.Mainboard).map((cardName) => ({
            name: sanitiseCardName(cardName),
          })),
          ...Object.keys(deck.Sideboard).map((cardName) => ({
            name: sanitiseCardName(cardName),
          })),
        ],
      };

      const scryfallCards = await fetchCardsByDeck(scryfallIdentifiers);

      const scryfallDict = scryfallCards.reduce((acc, card) => {
        acc[card.name] = card;
        return acc;
      }, {} as Record<string, (typeof scryfallCards)[number]>);

      const creatures: EnrichedCard[] = [];
      const instants: EnrichedCard[] = [];
      const sorceries: EnrichedCard[] = [];
      const enchantments: EnrichedCard[] = [];
      const artifacts: EnrichedCard[] = [];
      const planeswalkers: EnrichedCard[] = [];
      const lands: EnrichedCard[] = [];
      const others: EnrichedCard[] = [];

      Object.entries(deck.Mainboard).forEach(([cardName, entry]) => {
        const cardData = scryfallDict[cardName];

        const typeLine = cardData?.type_line?.toLowerCase() ?? 'unknown';

        switch (true) {
          case typeLine.includes('land'):
            lands.push({ ...entry, name: cardName, cardData });
            break;
          case typeLine.includes('creature'):
            creatures.push({ ...entry, name: cardName, cardData });
            break;
          case typeLine.includes('instant'):
            instants.push({ ...entry, name: cardName, cardData });
            break;
          case typeLine.includes('sorcery'):
            sorceries.push({ ...entry, name: cardName, cardData });
            break;
          case typeLine.includes('enchantment'):
            enchantments.push({ ...entry, name: cardName, cardData });
            break;
          case typeLine.includes('artifact'):
            artifacts.push({ ...entry, name: cardName, cardData });
            break;
          case typeLine.includes('planeswalker'):
            planeswalkers.push({ ...entry, name: cardName, cardData });
            break;
          default:
            others.push({ ...entry, name: cardName, cardData });
            break;
        }
      });

      const viewableDeck: ViewableDeck = {
        mainboard: {
          creature: creatures,
          instant: instants,
          sorcery: sorceries,
          enchantment: enchantments,
          artifact: artifacts,
          planeswalker: planeswalkers,
          land: lands,
          other: others.sort((a, b) => a.name.localeCompare(b.name)),
        },
        sideboard: Object.entries(deck.Sideboard).map(([cardName, entry]) => ({
          ...entry,
          name: cardName,
          cardData: scryfallDict[cardName],
        })),
      };

      return viewableDeck;
    },
  });
}
