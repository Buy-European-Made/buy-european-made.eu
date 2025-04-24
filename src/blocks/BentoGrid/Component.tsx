import type { BentoGrid as BentoGridProps } from 'src/payload-types'

import React from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'

type Props = BentoGridProps

export const BentoGrid: React.FC<Props> = ({ elements }) => {
  console.log(elements)
  if (!elements) return null
  const filteredEl = elements.filter((el) => el !== null && el !== undefined)
  return (
    <>
      <div className="grid grid-cols-3 md:grid-cols-3 grid-rows-3 md:grid-rows-3 gap-2 md:gap-2 m-4">
        <Card className="col-start-1 row-start-1 col-span-2 row-span-2 md:col-start-1 md:row-start-1 md:col-span-2 md:row-span-2 flex flex-col justify-between items-center">
          <CardTitle>{filteredEl[0]?.title}</CardTitle>
          <CardDescription>{filteredEl[0]?.content}</CardDescription>
        </Card>
        <Card className="col-start-3 row-start-1 md:col-start-3 md:row-start-1 md:col-span-1 md:row-span-1 rounded-md ">
          <CardTitle>{filteredEl[1]?.title}</CardTitle>
          <CardContent>{filteredEl[1]?.content}</CardContent>
        </Card>
        <Card className="col-start-3 row-start-2 row-span-2 md:col-start-3 md:row-start-2 md:col-span-1 md:row-span-2 rounded-md">
          <CardTitle>{filteredEl[2]?.title}</CardTitle>
          <CardContent>{filteredEl[2]?.content}</CardContent>
        </Card>
        <Card className="col-start-2 row-start-3 md:col-start-2 md:row-start-3 md:col-span-1 md:row-span-1  rounded-md ">
          <CardTitle>{filteredEl[3]?.title}</CardTitle>
          <CardContent>{filteredEl[3]?.content}</CardContent>
        </Card>
        <Card className="col-start-1 row-start-3 md:col-start-1 md:row-start-3 md:col-span-1 md:row-span-1  rounded-md ">
          <CardTitle>{filteredEl[4]?.title}</CardTitle>
          <CardContent>{filteredEl[4]?.content}</CardContent>
        </Card>
      </div>
    </>
  )
}
