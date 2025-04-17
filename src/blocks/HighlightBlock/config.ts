import type { Block } from 'payload'

export const HighlightBlock: Block = {
  slug: 'highlightBlock',
  labels: {
    singular: 'Highlight Block',
    plural: 'Highlight Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      required: true,
    },
    {
      name: 'collection',
      type: 'select',
      label: 'Select the collection you want to highlight',
      required: true,
      options: [
        { label: 'European Products', value: 'eu-products' },
        { label: 'Category', value: 'categories' },
      ]
    },
    {
      type: 'collapsible',
      label: 'Selected Elements',
      fields: [
        {
          type: 'array',
          name: 'productArray',
          label: 'Select Products',
          minRows: 3,
          maxRows: 5,
          fields: [

            {
              name: 'product',
              type: 'relationship',
              label: 'Pick product',
              relationTo: 'eu-products',
            },
          ]
        },
        {
          type: 'array',
          name: 'categoriesArray',
          label: 'Select Categories',
          minRows: 1,
          maxRows: 5,
          fields: [
            {
              name: 'categories',
              type: 'relationship',
              label: 'Pick categories',
              relationTo: 'categories',
            },
          ]
        }
      ],
    },
  ],
  interfaceName: 'highlightBlock'
}
