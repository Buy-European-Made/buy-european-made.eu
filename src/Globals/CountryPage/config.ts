import type { GlobalConfig } from 'payload'
import { generateCountryPreviewPath } from '@/utilities/generatePreviewPath'

import { CallToAction } from '@/blocks/CallToAction/config'
import { Content } from '@/blocks/Content/config'
import { FormBlock } from '@/blocks/Form/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { ProductsListBlock } from '@/blocks/ProductList/config'
import { FAQ } from '../../blocks/FAQ/config'
import { Team } from '@/blocks/Team/config'
import { Banner } from '@/blocks/Banner/config'
import { Stats } from '@/blocks/Stats/config'
import { CountryDesciptionBlockConfig } from '@/blocks/CountryDescriptionBlock/config'

export const CountryPage: GlobalConfig = {
  slug: 'countryPage',
  access: {
    read: () => true,
  },

  admin: {
    livePreview: {
      url: () => {
        const path = generateCountryPreviewPath()

        return path
      },
    },
    preview: () => {
      const path = generateCountryPreviewPath()

      return path
    },
  },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        CallToAction,
        Content,
        MediaBlock,
        FormBlock,
        ProductsListBlock,
        FAQ,
        Team,
        Banner,
        Stats,
        CountryDesciptionBlockConfig,
      ],
      required: true,
      admin: {
        initCollapsed: true,
      },
    },
  ],
  hooks: {},
}
