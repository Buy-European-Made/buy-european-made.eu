import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

export const ReplacedProducts: CollectionConfig = {
  slug: 'replaced-products',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  fields: [
    {
      name: 'Name',
      type: 'text',
    },
    {
      name: 'description',
      type: 'text',
    },
    // We probably don't want to link back to their websites.
    // {
    //   name: 'link',
    //   type: 'text',
    // },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}

