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
      type: 'radio',
      label: 'Select the collection you want to highlight',
      required: true,
      options: [
        { label: 'European Products', value: 'eu-products' },
        { label: 'Category', value: 'categories' },
        { label: 'Articles', value: 'articles' },
      ]
    },
    {
      name: 'size',
      type: 'radio',
      label: 'Select block size',
      required: true,
      options: [
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
        { label: 'Extra large', value: 'xl' },
      ]
    },
    {
      name: 'cardsToShow',
      type: 'radio',
      label: 'Select how many cards you want to show on large screens',
      required: true,
      options: [
        { label: '2', value: 'two' },
        { label: '3', value: 'three' },
      ],
      defaultValue: 'three'
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
          admin: {
            condition: (_, siblingData) => siblingData.collection === 'eu-products',
          },
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
          minRows: 3,
          maxRows: 5,
          admin: {
            condition: (_, siblingData) => siblingData.collection === 'categories',
          },
          fields: [
            {
              name: 'categories',
              type: 'relationship',
              label: 'Pick categories',
              relationTo: 'categories',
            },
          ]
        },

        {
          type: 'array',
          name: 'articlesArray',
          label: 'Select Articles',
          minRows: 3,
          maxRows: 5,
          admin: {
            condition: (_, siblingData) => siblingData.collection === 'articles',
          },
          fields: [
            {
              name: 'articles',
              type: 'relationship',
              label: 'Pick articles',
              relationTo: 'articles',
            },
          ]
        }
      ],
    },
  ],
  interfaceName: 'highlightBlock'
}
