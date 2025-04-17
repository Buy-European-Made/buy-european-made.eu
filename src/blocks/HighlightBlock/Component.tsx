
import { EuProduct, HighlightBlock as HighlightBlockProps } from '@/payload-types'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Card, CardContent } from '@/components/ui/card'
import { H3 } from '@/components/ui/typography'
import { getPayload } from 'payload'
import config from '@payload-config'
import { HighlightElementsComponent } from './elements/Component'

type Props = HighlightBlockProps

export const HighlightBlock: React.FC<Props> = async ({ title, collection, productArray, categoriesArray }) => {
  console.log(title, collection, productArray, categoriesArray)
  const ids: number[] = productArray?.filter(el => el !== null && el !== undefined).map(product => {
    // console.log(product)
    const found = typeof product === 'number' ? product : product.product
    // console.log("found", found)
    return found
  })
  // console.log("Found ids", ids)
  const payload = await getPayload({ config })
  const findResult = await payload.find({
    collection: collection,
    where: {
      id: {
        in: ids
      }
    }
  })
  // console.log("Found docs:", findResult.docs)
  return (
    <div className='border-3 border-red-300' >
      <HighlightElementsComponent collection={collection} title={title} array={findResult.docs} />
    </div>
  )
}
