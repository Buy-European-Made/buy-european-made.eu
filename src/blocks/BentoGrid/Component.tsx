import type { BentoGrid as BentoGridProps } from 'src/payload-types'

import React from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import MainElement from './elements/MainElement'

type Props = BentoGridProps

export const BentoGrid: React.FC<Props> = ({ mainElements, elements }) => {
  return (
    <>
      <div id="outerContainer" className="flex items-center justify-center w-full">
        <div
          id="grid"
          className="grid grid-cols-2 md:grid-cols-3 grid-rows-7 md:grid-rows-3 gap-4 p-4 lg:w-2/3 h-[90vh]"
        >
          <Link
            href={mainElements[0]?.link || ''}
            className={
              'col-start-1 col-span-2 row-start-1 row-span-2 md:col-start-1 md:row-start-1 md:col-span-2 md:row-span-2 no-underline'
            }
          >
            <MainElement
              title={mainElements[0]?.title ?? ''}
              content={mainElements[0]?.content ?? ''}
              fontColor={mainElements[0]?.fontColor ?? ''}
              textWidth={mainElements[0]?.textWidth ?? ''}
              bgImage={mainElements[0]?.bgImage?.url ?? ''}
            />
            {/* <Card */}
            {/*   className={cn('bg-cover bg-center break-words h-full p-4', { */}
            {/*     'text-white': mainElements[0]?.fontColor === 'white', */}
            {/*     'text-black': mainElements[0]?.fontColor === 'black', */}
            {/*   })} */}
            {/*   style={{ */}
            {/*     backgroundImage: `url(${mainElements[0]?.bgImage?.url || ''})`, */}
            {/*     borderRadius: '0.5rem', */}
            {/*   }} */}
            {/* > */}
            {/*   <div */}
            {/*     className={cn('flex flex-col justify-between items-start h-1/2', { */}
            {/*       'w-full': mainElements[0]?.textWidth === 'full', */}
            {/*       'w-1/2': mainElements[0]?.textWidth === 'half', */}
            {/*     })} */}
            {/*   > */}
            {/*     <div> */}
            {/*       <CardTitle className="lg:text-4xl">{mainElements[0]?.title}</CardTitle> */}
            {/*     </div> */}
            {/*     <div className="flex justify-center items-center"> */}
            {/*       <CardContent className="p-0">{mainElements[0]?.content}</CardContent> */}
            {/*     </div> */}
            {/*   </div> */}
            {/* </Card> */}
          </Link>

          <Link
            href={elements[0]?.link || ''}
            className={
              'col-start-1 row-start-3 col-span-2 row-span-1 md:col-start-3 md:row-start-1 md:col-span-1 md:row-span-1 no-underline'
            }
          >
            <Card
              className={cn('bg-cover bg-center break-words h-full p-4', {
                'text-white': elements[0]?.fontColor === 'white',
                'text-black': elements[0]?.fontColor === 'black',
              })}
              style={{
                backgroundImage: `url(${elements[0]?.bgImage?.url || ''})`,
                borderRadius: '0.5rem',
              }}
            >
              <div>
                <CardTitle className="lg:text-4xl">{elements[0]?.title}</CardTitle>
              </div>
              <div className="flex h-full justify-center items-center">
                <CardContent className="p-0">{elements[0]?.content}</CardContent>
              </div>
            </Card>
          </Link>

          <Link
            href={mainElements[0]?.link || ''}
            className={
              'col-start-1  col-span-2 row-start-4 row-span-2 md:col-start-3 md:row-start-2 md:col-span-1 md:row-span-2 no-underline'
            }
          >
            <MainElement
              title={mainElements[1]?.title ?? ''}
              content={mainElements[1]?.content ?? ''}
              bgImage={mainElements[1]?.bgImage?.url ?? ''}
              fontColor={mainElements[1]?.fontColor ?? ''}
              textWidth={mainElements[1]?.textWidth ?? ''}
            />
            {/* <Card */}
            {/*   className={cn('bg-cover bg-center break-words h-full p-4', { */}
            {/*     'text-white': mainElements[1]?.fontColor === 'white', */}
            {/*     'text-black': mainElements[1]?.fontColor === 'black', */}
            {/*   })} */}
            {/*   style={{ */}
            {/*     backgroundImage: `url(${mainElements[1]?.bgImage?.url || ''})`, */}
            {/*     borderRadius: '0.5rem', */}
            {/*   }} */}
            {/* > */}
            {/*   <div */}
            {/*     className={cn('flex flex-col justify-between items-start h-1/2', { */}
            {/*       'w-full': mainElements[1]?.textWidth === 'full', */}
            {/*       'w-1/2': mainElements[1]?.textWidth === 'half', */}
            {/*     })} */}
            {/*   > */}
            {/*     <div> */}
            {/*       <CardTitle className="lg:text-4xl">{mainElements[1]?.title}</CardTitle> */}
            {/*     </div> */}
            {/*     <div className="flex justify-center items-center"> */}
            {/*       <CardContent className="p-0">{mainElements[1]?.content}</CardContent> */}
            {/*     </div> */}
            {/*   </div> */}
            {/* </Card> */}
          </Link>

          <Link
            href={elements[1]?.link || ''}
            className={
              'col-start-1 col-span-2 row-start-6  md:col-start-2 md:row-start-3 md:col-span-1 md:row-span-1 no-underline'
            }
          >
            <Card
              className={cn('bg-cover bg-center break-words h-full p-4', {
                'text-white': elements[1]?.fontColor === 'white',
                'text-black': elements[1]?.fontColor === 'black',
              })}
              style={{
                backgroundImage: `url(${elements[1]?.bgImage?.url || ''})`,
                borderRadius: '0.5rem',
              }}
            >
              <div>
                <CardTitle className="lg:text-4xl ">{elements[1]?.title}</CardTitle>
              </div>
              <div className="flex justify-center items-center">
                <CardContent className="p-0 ">{elements[1]?.content}</CardContent>
              </div>
            </Card>
          </Link>

          <Link
            href={elements[2]?.link || ''}
            className={
              'col-start-1 row-start-7 col-span-2 md:col-start-1 md:row-start-3 md:col-span-1 md:row-span-1 no-underline'
            }
          >
            <Card
              className={cn('bg-cover bg-center break-words h-full p-4', {
                'text-white': elements[2]?.fontColor === 'white',
                'text-black': elements[2]?.fontColor === 'black',
              })}
              style={{
                backgroundImage: `url(${elements[2]?.bgImage?.url || ''})`,
                borderRadius: '0.5rem',
              }}
            >
              <div>
                <CardTitle className="lg:text-4xl ">{elements[2]?.title}</CardTitle>
              </div>
              <div className="flex justify-center items-center">
                <CardContent className="p-0 ">{elements[2]?.content}</CardContent>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </>
  )
}
