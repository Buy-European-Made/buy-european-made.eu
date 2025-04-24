import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ProductsListBlock } from './ProductList/Component'
import { FAQBlock } from './FAQ/Component'
import { TeamBlock } from './Team/Component'
import { BannerBlock } from './Banner/Component'
import { StatsBlock } from './Stats/Component'
import { TabCards } from './TabCards/Component'
import { BentoGrid } from './BentoGrid/Component'

// key has to be same as the slug name
const blockComponents = {
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  productsList: ProductsListBlock,
  faq: FAQBlock,
  team: TeamBlock,
  // TODO: remove the whole block component if not used
  banner: BannerBlock,
  stats: StatsBlock,
  tabCards: TabCards,
  bentoGrid: BentoGrid,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
