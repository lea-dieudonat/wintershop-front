export type CollectionPayload<T = unknown> = {
  '@context'?: string;
  '@type'?: string;
  '@id'?: string;
  // Hydra (JSON-LD compacted or not)
  'hydra:member'?: T[];
  'hydra:totalItems'?: number;
  // Compacted keys
  member?: T[];
  totalItems?: number;
};

export function normalizeCollection<T>(data: CollectionPayload<T>) {
  const items = (data['hydra:member'] ?? data.member ?? []) as T[];
  const total =
    (data['hydra:totalItems'] ?? data.totalItems ?? items.length) as number;

  return { items, total };
}
