
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
  admin: {
    useAsTitle: 'coutryName'
  },
  fields: [
    {
      name: 'coutryName',
      type: 'text',
    },
    {
      name: 'flag',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'productsProduced',
      type: 'join',
      collection: 'products',
      on: 'producedIn'
    }
  ],
}
