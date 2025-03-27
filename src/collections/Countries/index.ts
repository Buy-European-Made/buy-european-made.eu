
import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

export const Countries: CollectionConfig = {
  slug: 'countries',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  fields: [
    {
      name: 'coutryName',
      type: 'text',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}

