import type {
  ScryfallCardsResponse,
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

export async function fetchCardsByName(
  cardName: string,
  options: { signal: AbortSignal }
) {
  try {
    if (options.signal?.aborted) {
      return [];
    }

    const result = await fetch(
      `https://api.scryfall.com/cards/search?order=name&q=${cardName}`,
      {
        method: 'GET',
        signal: options.signal,
      }
    );

    if (options.signal.aborted) {
      return [];
    }

    if (!result.ok) {
      throw new Error(`Scryfall API error: ${result.statusText}`);
    }

    const data = (await result.json()) as ScryfallCardsResponse;

    return data.data;
  } catch (error) {
    console.error('Unexpected error:', error);
    return [];
  }
}
