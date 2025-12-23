import type { ScryfallCard } from './scryfall';

export interface CardEntry {
  id: string;
  count: number;
}

export interface DeckObj {
  Mainboard: Record<string, CardEntry>;
  Sideboard: Record<string, CardEntry>;
}

export interface Deck {
  id: number;
  created_at: string;
  archetype: string;
  decklist: string;
  deck_obj: DeckObj;
  player_id: string;
}

export interface EnrichedCard extends CardEntry {
  name: string;
  cardData: ScryfallCard;
}

export type CardType =
  | 'creature'
  | 'instant'
  | 'sorcery'
  | 'enchantment'
  | 'artifact'
  | 'planeswalker'
  | 'land'
  | 'other';

export interface ViewableDeck {
  mainboard: Record<CardType, EnrichedCard[]>;
  sideboard: EnrichedCard[];
}

export interface DeckDetails extends Deck {
  tournament_id: string;
  tournament_name: string;
  tournament_start_date: string;
  position: number;
  wins: number;
  losses: number;
  draws: number;
}
