export interface ScryfallListResponse {
  object: string;
  not_found: string[];
  data: ScryfallCard[];
}

export interface ScryfallCardsResponse {
  total_cards: number;
  data: ScryfallCard[];
}

export interface ScryfallCard {
  id: string;
  name: string;
  image_uris: {
    small: string;
    normal: string;
    large: string;
    png: string;
    art_crop: string;
    border_crop: string;
  };
  card_faces: ScryfallCard[];
  mana_cost: string;
  cmc: number;
  type_line: string;
}

export interface ScryfallIdentifiers {
  identifiers: Array<{ id?: string; name?: string }>;
}
