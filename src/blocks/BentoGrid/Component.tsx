import type { BentoGrid as BentoGridProps } from 'src/payload-types'

import React from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import BentoElement from './elements/BentoElement'

type Props = BentoGridProps

export const BentoGrid: React.FC<Props> = ({ mainElements, elements }) => {
  return (
    <>
      <div id="outerContainer" className="flex items-center justify-center w-full">
        <div
          id="grid"
          className="grid grid-cols-2 md:grid-cols-3 grid-rows-7 md:grid-rows-3 gap-4 p-4 lg:w-3/4 h-[90vh]"
        >
          <div
            className={
              'col-start-1 col-span-2 row-start-1 row-span-2 md:col-start-1 md:row-start-1 md:col-span-2 md:row-span-2 no-underline'
            }
          >
            <BentoElement
              title={mainElements[0]?.title ?? ''}
              content={mainElements[0]?.content ?? ''}
              fontColor={mainElements[0]?.fontColor ?? ''}
              textWidth={mainElements[0]?.textWidth ?? ''}
              bgImage={mainElements[0]?.bgImage?.url ?? ''}
            />
          </div>

          <div
            className={
              'col-start-1 row-start-3 col-span-2 row-span-1 md:col-start-3 md:row-start-1 md:col-span-1 md:row-span-1 no-underline'
            }
          >
            <BentoElement
              title={elements[0]?.title ?? ''}
              fontColor={elements[0]?.fontColor ?? ''}
              textWidth={elements[0]?.textWidth ?? ''}
              bgImage={elements[0]?.bgImage?.url ?? ''}
            />
          </div>

          <div
            className={
              'col-start-1  col-span-2 row-start-4 row-span-2 md:col-start-3 md:row-start-2 md:col-span-1 md:row-span-2 no-underline'
            }
          >
            <BentoElement
              title={mainElements[1]?.title ?? ''}
              content={mainElements[1]?.content ?? ''}
              bgImage={mainElements[1]?.bgImage?.url ?? ''}
              fontColor={mainElements[1]?.fontColor ?? ''}
              textWidth={mainElements[1]?.textWidth ?? ''}
            />
          </div>

          <div
            className={
              'col-start-1 col-span-2 row-start-6  md:col-start-2 md:row-start-3 md:col-span-1 md:row-span-1 no-underline'
            }
          >
            <BentoElement
              title={elements[1]?.title ?? ''}
              bgImage={elements[1]?.bgImage?.url ?? ''}
              fontColor={elements[1]?.fontColor ?? ''}
              textWidth={elements[1]?.textWidth ?? ''}
            />
          </div>

          <div
            className={
              'col-start-1 row-start-7 col-span-2 md:col-start-1 md:row-start-3 md:col-span-1 md:row-span-1 no-underline'
            }
          >
            <BentoElement
              title={elements[2]?.title ?? ''}
              bgImage={elements[2]?.bgImage?.url ?? ''}
              fontColor={elements[2]?.fontColor ?? ''}
              textWidth={elements[2]?.textWidth ?? ''}
            />
          </div>
        </div>
      </div>
    </>
  )
}
