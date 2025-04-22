import { parseAsString, createLoader } from 'nuqs/server'

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const searchParams = {
  s: parseAsString.withDefault(''),
}

export const loadSearchParams = createLoader(searchParams)
