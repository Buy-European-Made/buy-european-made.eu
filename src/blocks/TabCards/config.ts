import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const TabCards: Block = {
  slug: 'tabCards',
  interfaceName: 'TabCards',
  fields: [
    {
      name: 'color',
      type: 'select', // or 'color' if your editor supports it
      label: 'Color',
      defaultValue: 'eu-blue',
      options: [
        { label: 'Yellow', value: 'eu-yellow' },
        { label: 'Blue', value: 'eu-blue' },
        // Add more color options as needed
      ],
      admin: {
        position: 'sidebar', // Optional: Position the field in the sidebar
      },
    },
    {
      name: 'columns',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'text',
          type: 'richText',
          maxLength: 20,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5', 'p'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
        },
      ],
    },
  ],
}
