import React from 'react'

import type { Category, Country, EuProduct, ReplacedProduct, Subcategory } from '@/payload-types'

import { Media } from '@/components/Media'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { H1, H2, H3, H4 } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: EuProduct;
}

export const ProductCard: React.FC<ProductCardProps> = async ({ product }) => {

  return (
    <>
      <Card className='h-full flex flex-col'>

        <CardHeader>
          <div className='flex flex-col md:flex-row justify-between'>
            <div className='flex items-center justify-center'>
              <Media
                imgClassName='w-10 h-10 border border-border rounded-full'
                resource={product.logo}
              />
              <H2 className='ml-2 pb-0'>
                {product.name}
              </H2>
            </div>
            <div className='flex items-center justify-center '>
              <H4 className='pb-0'>
                {product.producedIn?.map((c: Country | number) => {
                  if (typeof c !== 'number') {
                    return <p key={c.id}>{c.name}</p>
                  }
                }
                )}
              </H4>
            </div>
          </div>
        </CardHeader>


        <div className='flex flex-col justify-between h-full gap-2'>
          <CardDescription className='text-ellipsis overflow-hidden h-fit p-6' >
            {product.description}
          </CardDescription>

          <div className='flex flex-col'>
            <CardContent className='flex flex-col justify-end text-xs gap-2'>

              <div className='flex items-center '>
                <p className='font-semibold text-gray-800 dark:text-gray-300'> Category: </p>
              </div>
              <div className='flex gap-2 flex-wrap' >
                {product.categories?.map((category: Category | number) => {
                  if (category !== undefined && typeof category !== 'number') {
                    return (
                      <p key={category.id} className='text-blue-500 font-medium border-2 border-blue-500 p-1 rounded '>
                        {category.name}
                      </p>
                    )
                  }
                })}
              </div>
              <div className='flex items-center '>
                <p className='font-semibold text-gray-800 dark:text-gray-300'> Subcategory: </p>
              </div>
              <div className='flex gap-2 flex-wrap' >
                {product.subcategories?.map((subcategory: Subcategory | number) => {
                  if (subcategory !== undefined && typeof subcategory !== 'number') {
                    return (
                      <p key={subcategory.id} className='text-yellow-500 font-medium border-2 border-yellow-500 p-1 rounded '>
                        {subcategory.name}
                      </p>
                    )
                  }
                })}
              </div>

              <div className='flex items-center '>
                <p className='font-semibold text-gray-800 dark:text-gray-300'> Replaces: </p>
              </div>
              <div className='flex gap-2 flex-wrap' >
                {product.replaces?.map((replacedProduct: ReplacedProduct | number) => {
                  if (replacedProduct !== undefined && typeof replacedProduct !== 'number') {
                    return (
                      <p key={replacedProduct.id} className='text-gray-500 font-medium  border-2 border-gray-500 p-1 rounded'>
                        {replacedProduct.name}
                      </p>
                    )
                  }
                })}

              </div>

            </CardContent>
            <CardFooter className='flex gap-4 mt-3'>
              <Button>
                More details
              </Button>

              <Button className='border-2 border-gray-800 text-gray-800 bg-transparent dark:text-white dark:border-white'>
                Visit website
              </Button>
            </CardFooter>

          </div>


        </div>
      </Card >


    </>
  )
}

