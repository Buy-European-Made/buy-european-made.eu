import type { CollectionConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const Brands: CollectionConfig = {
  slug: 'brands',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'link',
      type: 'text',
    },
    {
      name: 'produces',
      type: 'join',
      collection: 'eu-products',
      on: 'producedBy',
      maxDepth: 2,
    },
    {
      name: 'ownedBy',
      type: 'join',
      collection: 'companies',
      on: 'ownBrands',
    },
  ],
}
