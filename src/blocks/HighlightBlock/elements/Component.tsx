"use client"
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from "@/components/ui/carousel"

import { Card, CardContent, CardDescription, CardFooter } from '@/components/ui/card'
import { H3 } from '@/components/ui/typography'
import { Button } from '@/components/ui/button';
import { Link } from '@payloadcms/ui';
import { ArrowLeft, ArrowRight } from 'lucide-react'

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
  image: string
  link: string
}

type SizeClasses = {
  [key: string]: {
    overallSize: string
    header: string,
    card: string
  };
};

const sizes: SizeClasses = {
  medium: {
    overallSize: 'w-1/2',
    header: 'max-h-8',
    card: 'h-48'
  },
  large: {
    overallSize: 'w-1/2',
    header: 'h-full',
    card: 'min-h-72'
  },
  xl: {
    overallSize: 'w-2/3',
    header: 'h-full',
    card: 'min-h-96'
  }
};

export const HighlightElementsComponent: React.FC<Props> = ({ title, array, size, cardsToShow }) => {
  const selectedSize = sizes[size]
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  let cardsToDisplay = 'md:basis-1/3 lg:basis-1/3'
  if (cardsToShow === 'two') {
    cardsToDisplay = 'md:basis-1/2 lg:basis-1/2'
  }

  return (
    <div className='flex flex-col justify-center items-center w-full p-4'>
      <H3 className='mb-2'>{title}</H3>
      <Carousel
        opts={{
          loop: true,
          align: 'start'
        }}
        setApi={setApi}
        className={`${selectedSize?.overallSize}`} // this changes the size of the entire component
      >
        <CarouselContent>
          {array.map((element, index) => (
            < CarouselItem key={index} className={`w-full ${cardsToDisplay}`} >
              <Card
                className={`${selectedSize?.card} bg-cover bg-center relative w-full md:max-w-md lg:max-w-lg`}
                style={{ backgroundImage: `url(${element.image})` }}
              >
                <CardContent className="absolute inset-0 flex flex-col bg-black bg-opacity-70 text-white items-start justify-between p-4">
                  <H3 className='line-clamp-4'>{element.name}</H3>
                  {
                    (size == 'large' || size == 'xl') && element.summary &&
                    <CardDescription className='text-white line-clamp-3'>
                      {element.summary}
                    </CardDescription>
                  }
                  <Button asChild className='text-white p-0' variant={'link'}>
                    <Link target='_blank' href='' className='text-black'>More Details</Link>

                  </Button>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className='flex justify-start items-start gap-3 pt-2'>
          <Button className='rounded-full w-10 p-1' variant='outline' onClick={() => api?.scrollTo(current - 1)}>
            <ArrowLeft />
          </Button>
          <Button className='rounded-full w-10 p-1' variant={'outline'} onClick={() => api?.scrollTo(current + 1)}>
            <ArrowRight />
          </Button>
        </div>
      </Carousel>
    </div >
  )
}
