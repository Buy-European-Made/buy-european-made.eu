import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { slugField } from '@/fields/slug'

export const Subcategories: CollectionConfig = {
  slug: 'subcategories',
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
      name: 'mainCategory',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      hasMany: true,
    },
    {
      name: 'products',
      type: 'join',
      collection: 'eu-products',
      on: 'subcategories',
    },
    ...slugField('name'),
  ],
}
