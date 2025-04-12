import type { Block } from 'payload'

export const Team: Block = {
  slug: 'team',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      required: true,
      defaultValue: 'Our team',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Section Subtitle',
      defaultValue:
        "Go European would not be possible without the project's dozens of incredible volunteers.",
    },
    {
      name: 'members',
      type: 'array',
      label: 'Team Members',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Profile Picture',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          label: 'Name',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title/Role',
          required: true,
        },
        {
          name: 'quote',
          type: 'textarea',
          label: 'Quote/Description',
        },
      ],
    },
  ],
  interfaceName: 'TeamBlock',
}
