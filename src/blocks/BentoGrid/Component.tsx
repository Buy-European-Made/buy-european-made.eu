import type { BentoGrid as BentoGridProps } from 'src/payload-types'

import React from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

type Props = BentoGridProps

export const BentoGrid: React.FC<Props> = ({ title, content, link, bgImage, elements }) => {
  console.log(elements)
  if (!elements) return null
  const filteredEl = elements.filter((el) => el !== null && el !== undefined)
  return (
    <>
      <div id="outerContainer" className="flex items-center justify-center w-full">
        <div
          id="grid"
          className="grid grid-cols-2 md:grid-cols-3 grid-rows-7 md:grid-rows-3 gap-4 p-4 md:w-2/3 h-[100vh]"
        >
          <Card
            className="col-start-1 col-span-2 row-start-1 row-span-2 md:col-start-1 md:row-start-1 md:col-span-2 md:row-span-2 p-4 bg-cover bg-center rounded-lg"
            style={{
              backgroundImage: `url(${bgImage?.url})`,
              borderRadius: '0.5rem',
            }}
          >
            <Link href={link}>
              <div>
                <CardTitle className="text-6xl text-white">{title}</CardTitle>
              </div>
              <div className="flex justify-center items-center">
                <CardContent className="p-0 text-white">{content}</CardContent>
              </div>
            </Link>
          </Card>

          <Card
            className="col-start-1 row-start-3 col-span-2 row-span-1 md:col-start-3 md:row-start-1 md:col-span-1 md:row-span-1 rounded-md p-4"
            style={{
              backgroundImage: `url(${filteredEl[1]?.bgImage?.url})`,
              borderRadius: '0.5rem',
            }}
          >
            <div>
              <CardTitle className="md:text-6xl text-white">{filteredEl[0]?.title}</CardTitle>
            </div>
            <div className="flex h-full justify-center items-center">
              <CardContent className="p-0 text-white">{filteredEl[0]?.content}</CardContent>
            </div>
          </Card>

          <Card
            className="col-start-1  col-span-2 row-start-4 row-span-2 md:col-start-3 md:row-start-2 md:col-span-1 md:row-span-2 rounded-md p-4"
            style={{
              backgroundImage: `url(${filteredEl?.[1]?.bgImage?.url})`,
              borderRadius: '0.5rem',
            }}
          >
            <div>
              <CardTitle className="md:text-6xl text-white">{filteredEl[1]?.title}</CardTitle>
            </div>
            <div className="flex justify-center items-center">
              <CardContent className="p-0 text-white">{filteredEl[1]?.content}</CardContent>
            </div>
          </Card>

          <Card
            className="col-start-1 col-span-2 row-start-6  md:col-start-2 md:row-start-3 md:col-span-1 md:row-span-1  rounded-md p-4"
            style={{
              backgroundImage: `url(${filteredEl?.[2]?.bgImage?.url})`,
              borderRadius: '0.5rem',
            }}
          >
            <div>
              <CardTitle className="md:text-6xl text-white">{filteredEl[2]?.title}</CardTitle>
            </div>
            <div className="flex justify-center items-center">
              <CardContent className="p-0 text-white">{filteredEl[2]?.content}</CardContent>
            </div>
          </Card>

          <Card
            className="col-start-1 row-start-7 col-span-2 md:col-start-1 md:row-start-3 md:col-span-1 md:row-span-1  rounded-md p-4"
            style={{
              backgroundImage: `url(${filteredEl?.[3]?.bgImage?.url})`,
              borderRadius: '0.5rem',
            }}
          >
            <div>
              <CardTitle className="md:text-6xl text-white">{filteredEl[3]?.title}</CardTitle>
            </div>
            <div className="flex justify-center items-center">
              <CardContent className="p-0 text-white">{filteredEl[3]?.content}</CardContent>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
