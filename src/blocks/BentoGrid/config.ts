import type { Block } from 'payload'

export const BentoGrid: Block = {
  slug: 'bentoGrid',
  interfaceName: 'BentoGrid',
  fields: [
    {
      type: 'collapsible',
      label: 'Main element',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'content',
          type: 'text',
        },
        {
          name: 'link',
          type: 'text',
        },
        {
          name: 'bgImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Picture',
        },
      ],
    },
    {
      name: 'elements',
      type: 'array',
      minRows: 4,
      maxRows: 4,
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'link',
          type: 'text',
        },
        {
          name: 'bgImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Picture',
        },
      ],
    },
  ],
  labels: {
    plural: 'Bento Grid',
    singular: 'Bento Grids',
  },
}
