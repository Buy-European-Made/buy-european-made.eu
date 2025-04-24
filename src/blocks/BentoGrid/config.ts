import type { Block } from 'payload'

export const BentoGrid: Block = {
  slug: 'bentoGrid',
  interfaceName: 'BentoGrid',
  fields: [
    {
      name: 'elements',
      type: 'array',
      minRows: 5,
      maxRows: 5,
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
  ],
  labels: {
    plural: 'Bento Grid',
    singular: 'Bento Grids',
  },
}
