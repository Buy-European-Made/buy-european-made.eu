import type { Block } from 'payload'

export const BentoGrid: Block = {
  slug: 'bentoGrid',
  interfaceName: 'BentoGrid',
  fields: [
    {
      type: 'array',
      name: 'mainElements',
      label: 'Main elements',
      required: true,
      labels: {
        singular: 'the biggest elements',
        plural: 'the biggest elements',
      },
      minRows: 2,
      maxRows: 2,
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
        {
          name: 'fontColor',
          type: 'radio',
          admin: {
            condition: (_, siblingData) =>
              siblingData.bgImage !== null && siblingData.bgImage !== undefined,
          },
          options: [
            { label: 'white', value: 'white' },
            { label: 'black', value: 'black' },
          ],
        },
        {
          name: 'textWidth',
          type: 'radio',
          options: [
            { label: '50%', value: 'half' },
            { label: '100%', value: 'full' },
          ],
        },
      ],
    },
    {
      name: 'elements',
      type: 'array',
      labels: {
        singular: 'the smallest elements',
        plural: 'the smallest elements',
      },
      minRows: 3,
      maxRows: 3,
      required: true,
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
        {
          name: 'fontColor',
          type: 'radio',
          admin: {
            condition: (_, siblingData) =>
              siblingData.bgImage !== null && siblingData.bgImage !== undefined,
          },
          options: [
            { label: 'white', value: 'white' },
            { label: 'black', value: 'black' },
          ],
        },
        {
          name: 'textWidth',
          type: 'radio',
          options: [
            { label: '50%', value: 'half' },
            { label: '100%', value: 'full' },
          ],
        },
      ],
    },
  ],
  labels: {
    plural: 'Bento Grid',
    singular: 'Bento Grid',
  },
}
