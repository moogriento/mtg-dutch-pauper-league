import type {
  ScryfallIdentifiers,
  ScryfallListResponse,
} from '../domain-models/scryfall';

export async function fetchCardsByDeck(identifiers: ScryfallIdentifiers) {
  try {
    const result = await fetch('https://api.scryfall.com/cards/collection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(identifiers),
    });

    if (!result.ok) {
      throw new Error(`Scryfall API error: ${result.statusText}`);
    }

    const data = (await result.json()) as ScryfallListResponse;

    return data.data;
  } catch (error) {
    console.error('Unexpected error:', error);
    return [];
  }
}
