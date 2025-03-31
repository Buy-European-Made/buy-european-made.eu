import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
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
    useAsTitle: 'name',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          description: 'General information about the product',
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
              name: 'replaces',
              type: 'relationship',
              relationTo: 'replaced-products',
              hasMany: true,
              filterOptions: ({ siblingData }) => {
                return {
                  categories: {
                    in: siblingData.categories
                  }
                }
              }
            },
            {
              name: 'producedBy',
              type: 'relationship',
              relationTo: 'brands',
            },
            {
              name: 'link',
              type: 'text',
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
            },
          ]
        },
        {
          label: 'Categories and tags',
          fields: [
            {
              name: 'categories',
              type: 'relationship',
              relationTo: 'categories',
              hasMany: true
            },
            {
              name: 'subcategories',
              type: 'relationship',
              relationTo: 'subcategories',
              hasMany: true,
              filterOptions: ({ data, siblingData }) => {
                return {
                  'data.categories': {
                    equals: 'siblingData.mainCategory'
                  }
                }
              }
            },
            {
              name: 'tags',
              type: 'relationship',
              relationTo: 'tags',
              hasMany: true,
            },
          ]
        },
        {
          label: 'Geographical information',
          fields: [

            {
              name: 'producedIn',
              type: 'relationship',
              relationTo: 'countries',
            },
            {
              name: 'availableIn',
              type: 'relationship',
              relationTo: 'countries',
              hasMany: true
            },
          ]
        }
      ]
    },
    ...slugField('name'),
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 1000, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}

