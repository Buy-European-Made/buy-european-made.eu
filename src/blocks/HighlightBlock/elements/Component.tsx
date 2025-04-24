'use client'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'

import { Card, CardContent, CardDescription, CardFooter } from '@/components/ui/card'
import { H3 } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Link } from '@payloadcms/ui'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '@/utilities/ui'

type Props = {
  title: string
  array: HighlightedElement[]
  size: string
  cardsToShow: string
}

/**
type that contains the information needed to fill an element
of the carousel
*/
export type HighlightedElement = {
  name: string
  summary?: string
  image?: string
  link: string
}

type SizeClasses = {
  [key: string]: {
    overallSize: string
    header: string
    card: string
  }
}

const sizes: SizeClasses = {
  medium: {
    overallSize: 'w-1/2',
    header: 'max-h-8',
    card: 'h-48',
  },
  large: {
    overallSize: 'w-2/3',
    header: 'h-full',
    card: 'min-h-72',
  },
  xl: {
    overallSize: 'w-2/3',
    header: 'h-full',
    card: 'min-h-96',
  },
}

export const HighlightElementsComponent: React.FC<Props> = ({
  title,
  array,
  size,
  cardsToShow,
}) => {
  const selectedSize = sizes[size]

  return (
    <div className="flex flex-col justify-center items-center w-full p-4">
      <H3 className="mb-2">{title}</H3>
      <Carousel
        opts={{
          loop: true,
          align: 'start',
        }}
        className={`${selectedSize?.overallSize}`} // this changes the size of the entire component
      >
        <CarouselContent>
          {array.map((element, index) => (
            <CarouselItem
              key={index}
              // className={`w-full md:basis-1/2 ${cardsToDisplay} rounded-lg`}
              className={cn('w-full md:basis-1/2 rounded-lg', {
                'lg:basis-1/3': cardsToShow === 'three',
                'lg:basis-1/2': cardsToShow === 'two',
              })}
            >
              <Card
                className={`${selectedSize?.card} bg-cover bg-center relative w-full`}
                style={{ backgroundImage: `url(${element.image})` }}
              >
                <CardContent className="absolute inset-0 flex flex-col bg-neutral-950 bg-opacity-70 text-white items-start justify-between p-4 w-full rounded-lg">
                  <H3 className="line-clamp-4 w-full break-words">{element.name}</H3>
                  {(size == 'large' || size == 'xl') && element.summary && (
                    <CardDescription className="text-white line-clamp-3">
                      {element.summary}
                    </CardDescription>
                  )}
                  <Button asChild className="text-white p-0" variant={'link'}>
                    <Link target="_blank" href={element.link} className="text-black items-center">
                      More Details
                    </Link>
                  </Button>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
