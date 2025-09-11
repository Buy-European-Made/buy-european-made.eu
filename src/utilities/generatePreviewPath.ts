import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { PayloadRequest, CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  pages: '',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug }: Props) => {
  const encodedParams = new URLSearchParams({
    slug,
    collection,
    path: `${collectionPrefixMap[collection]}/${slug}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}

export const generateCountryPreviewPath = async () => {
  const payload = await getPayload({ config: configPromise })

  // Find one country from the collection.
  const countries = await payload.find({
    collection: 'countries',
    limit: 1,
  })
  const slug = countries.docs.pop()?.slug

  if (!slug) return '/next/preview?'

  const encodedParams = new URLSearchParams({
    slug: slug,
    collection: 'countries',
    path: `/countries/${slug}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}
