import type { Block } from 'payload'

export const Stats: Block = {
  slug: 'stats',
  labels: {
    singular: 'Stats Block',
    plural: 'Stats Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      required: true,
      defaultValue: 'About Us',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Section Subtitle',
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Stats',
      minRows: 1,
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          required: true,
          options: [
            { label: 'Activity', value: 'Activity' },
            { label: 'Alert Circle', value: 'AlertCircle' },
            { label: 'Award', value: 'Award' },
            { label: 'Bar Chart', value: 'BarChart' },
            { label: 'Check Circle', value: 'CheckCircle' },
            { label: 'Dollar Sign', value: 'DollarSign' },
            { label: 'Euro', value: 'Euro' },
            { label: 'Heart', value: 'Heart' },
            { label: 'Home', value: 'Home' },
            { label: 'Map', value: 'Map' },
            { label: 'Shopping Bag', value: 'ShoppingBag' },
            { label: 'Star', value: 'Star' },
            { label: 'Thumbs Up', value: 'ThumbsUp' },
            { label: 'Trophy', value: 'Trophy' },
            { label: 'Users', value: 'Users' },
          ],
        },
        {
          name: 'number',
          type: 'number',
          label: 'Number',
          required: true,
        },
        {
          name: 'suffix',
          type: 'text',
          label: 'Suffix',
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          label: 'Description',
          required: true,
        },
      ],
    },
  ],
  interfaceName: 'StatsBlock',
}
