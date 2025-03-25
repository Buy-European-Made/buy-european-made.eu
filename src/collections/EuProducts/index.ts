import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'

export const EuProducts: CollectionConfig = {
  slug: 'eu-products',
  labels: {
    singular: "European Product",
    plural: "European Products",
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: [
      'name',
      'description'
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true
    },
    {
      name: 'link',
      type: 'text',
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'replaces',
      type: 'relationship',
      relationTo: 'replaced-products',
      hasMany: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    ...slugField(),
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}

