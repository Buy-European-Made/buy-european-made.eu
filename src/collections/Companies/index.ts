
import type { CollectionConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { slugField } from '@/fields/slug'

export const Companies: CollectionConfig = {
  slug: 'companies',
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
      type: 'text'
    },
    {
      name: 'ownBrands',
      type: 'relationship',
      relationTo: 'brands',
      hasMany: true
    },
    ...slugField(),
  ],
}
