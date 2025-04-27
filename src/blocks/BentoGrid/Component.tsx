import type { BentoGrid as BentoGridProps } from 'src/payload-types'

import React from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { cn } from '@/utilities/ui'

type Props = BentoGridProps

export const BentoGrid: React.FC<Props> = ({
  mainTitle,
  mainContent,
  mainLink,
  mainBgImage,
  mainFontColor,
  secondMaintitle,
  secondMainContent,
  secondMainLink,
  secondMainBgImage,
  secondMainFontColor,
  elements,
}) => {
  console.log(elements)
  if (!elements) return null
  const filteredEl = elements.filter((el) => el !== null && el !== undefined)
  return (
    <>
      <div id="outerContainer" className="flex items-center justify-center w-full">
        <div
          id="grid"
          className="grid grid-cols-2 md:grid-cols-3 grid-rows-7 md:grid-rows-3 gap-4 p-4 lg:w-2/3 h-[90vh]"
        >
          <Link
            href={mainLink || ''}
            className={
              'col-start-1 col-span-2 row-start-1 row-span-2 md:col-start-1 md:row-start-1 md:col-span-2 md:row-span-2 no-underline'
            }
          >
            <Card
              className={cn('bg-cover bg-center break-words h-full p-4', {
                'text-white': mainFontColor === 'white',
                'text-black': mainFontColor === 'black',
              })}
              style={{
                backgroundImage: `url(${mainBgImage?.url || ''})`,
                borderRadius: '0.5rem',
              }}
            >
              <div>
                <CardTitle className="lg:text-4xl">{mainTitle}</CardTitle>
              </div>
              <div className="flex justify-center items-center">
                <CardContent className="p-0">{mainContent}</CardContent>
              </div>
            </Card>
          </Link>

          <Link
            href={filteredEl[0]?.link || ''}
            className={
              'col-start-1 row-start-3 col-span-2 row-span-1 md:col-start-3 md:row-start-1 md:col-span-1 md:row-span-1 no-underline'
            }
          >
            <Card
              className={cn('bg-cover bg-center break-words h-full p-4', {
                'text-white': filteredEl[0]?.fontColor === 'white',
                'text-black': filteredEl[0]?.fontColor === 'black',
              })}
              style={{
                backgroundImage: `url(${filteredEl[0]?.bgImage?.url || ''})`,
                borderRadius: '0.5rem',
              }}
            >
              <div>
                <CardTitle className="lg:text-4xl">{filteredEl[0]?.title}</CardTitle>
              </div>
              <div className="flex h-full justify-center items-center">
                <CardContent className="p-0">{filteredEl[0]?.content}</CardContent>
              </div>
            </Card>
          </Link>

          <Link
            href={secondMainLink || ''}
            className={
              'col-start-1  col-span-2 row-start-4 row-span-2 md:col-start-3 md:row-start-2 md:col-span-1 md:row-span-2 no-underline'
            }
          >
            <Card
              className={cn('bg-cover bg-center break-words h-full p-4', {
                'text-white': secondMainFontColor === 'white',
                'text-black': secondMainFontColor === 'black',
              })}
              style={{
                backgroundImage: `url(${secondMainBgImage?.url || ''})`,
                borderRadius: '0.5rem',
              }}
            >
              <div>
                <CardTitle className="lg:text-4xl">{secondMaintitle}</CardTitle>
              </div>
              <div className="flex justify-center items-center">
                <CardContent className="p-0">{secondMainContent}</CardContent>
              </div>
            </Card>
          </Link>

          <Link
            href={filteredEl[1]?.link || ''}
            className={
              'col-start-1 col-span-2 row-start-6  md:col-start-2 md:row-start-3 md:col-span-1 md:row-span-1 no-underline'
            }
          >
            <Card
              className={cn('bg-cover bg-center break-words h-full p-4', {
                'text-white': filteredEl[1]?.fontColor === 'white',
                'text-black': filteredEl[1]?.fontColor === 'black',
              })}
              style={{
                backgroundImage: `url(${filteredEl[1]?.bgImage?.url || ''})`,
                borderRadius: '0.5rem',
              }}
            >
              <div>
                <CardTitle className="lg:text-4xl ">{filteredEl[1]?.title}</CardTitle>
              </div>
              <div className="flex justify-center items-center">
                <CardContent className="p-0 ">{filteredEl[1]?.content}</CardContent>
              </div>
            </Card>
          </Link>

          <Link
            href={filteredEl[2]?.link || ''}
            className={
              'col-start-1 row-start-7 col-span-2 md:col-start-1 md:row-start-3 md:col-span-1 md:row-span-1 no-underline'
            }
          >
            <Card
              className={cn('bg-cover bg-center break-words h-full p-4', {
                'text-white': filteredEl[2]?.fontColor === 'white',
                'text-black': filteredEl[2]?.fontColor === 'black',
              })}
              style={{
                backgroundImage: `url(${filteredEl[2]?.bgImage?.url || ''})`,
                borderRadius: '0.5rem',
              }}
            >
              <div>
                <CardTitle className="lg:text-4xl ">{filteredEl[2]?.title}</CardTitle>
              </div>
              <div className="flex justify-center items-center">
                <CardContent className="p-0 ">{filteredEl[2]?.content}</CardContent>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </>
  )
}
