import { Category, EuProduct } from '@/payload-types'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Card, CardContent, CardDescription } from '@/components/ui/card'
import { H3 } from '@/components/ui/typography'
import Image from 'next/image'
import { Media } from '@/components/Media'

type Props = {
  title: string
  collection: string
  array: any[]
}
export const HighlightElementsComponent: React.FC<Props> = ({ title, collection, array }) => {
  // console.log(title, collection, array)
  return (
    <div className='flex flex-col justify-center items-center'>
      <H3 className='mb-2'>{title}</H3>
      <Carousel
        opts={{
          loop: true,
          align: 'center'
        }}

        className='w-3/5' // this changes the size of the entire component
      >
        <CarouselContent className=''>
          {array.map((p, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 border-3 border-yellow-400" >
              <Card
                className="aspect-auto h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${p.logo.url})` }}
              >
                <CardContent className="bg-black bg-opacity-70 text-white h-full flex items-center justify-center">
                  <div className='flex flex-col items-center justify-between h-full'>
                    <h2 className="text-2xl font-bold">{p.name}</h2>
                    <p className="text-lg">{p.link}</p>
                  </div>
                </CardContent>
              </Card>

            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div >
  )
}
