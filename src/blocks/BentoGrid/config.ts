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
          name: 'mainTitle',
          type: 'text',
        },
        {
          name: 'mainContent',
          type: 'text',
        },
        {
          name: 'mainLink',
          type: 'text',
        },
        {
          name: 'mainBgImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Picture',
        },
        {
          name: 'mainFontColor',
          type: 'radio',
          options: [
            { label: 'white', value: 'white' },
            { label: 'black', value: 'black' },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Second main element',
      required: true,
      fields: [
        {
          name: 'secondMaintitle',
          type: 'text',
        },
        {
          name: 'secondMainContent',
          type: 'text',
        },
        {
          name: 'secondMainLink',
          type: 'text',
        },
        {
          name: 'secondMainBgImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Picture',
        },
        {
          name: 'secondMainFontColor',
          type: 'radio',
          options: [
            { label: 'white', value: 'white' },
            { label: 'black', value: 'black' },
          ],
        },
      ],
    },
    {
      name: 'elements',
      type: 'array',
      minRows: 3,
      maxRows: 3,
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
          options: [
            { label: 'white', value: 'white' },
            { label: 'black', value: 'black' },
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
