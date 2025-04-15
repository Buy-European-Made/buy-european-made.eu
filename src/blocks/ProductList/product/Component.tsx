import React from 'react'

import type { Category, Country, EuProduct, ReplacedProduct, Subcategory } from '@/payload-types'

import { Media } from '@/components/Media'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { H2, H4 } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Link } from '@payloadcms/ui';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: EuProduct;
}

export const ProductCard: React.FC<ProductCardProps> = async ({ product }) => {
  const hasCategory = product.categories !== null && product.categories !== undefined && product.categories.length !== 0
  const hasSubcategory = product.subcategories !== null && product.subcategories !== undefined && product.subcategories.length !== 0
  const replacesProducts = product.replaces !== null && product.replaces !== undefined && product.replaces.length !== 0
  return (
    <>
      <Card className='h-full flex flex-col'>
        <CardHeader>
          <div className='flex flex-col xl:flex-row justify-between'>
            <div className='flex items-center justify-center'>
              <Media
                imgClassName='w-full h-auto rounded-full dark:border dark:border-white dark:bg-white'
                resource={product.logo}
                alt={`${product.name} logo`}
              />
              <H2 className='mx-2 pb-0 flex-wrap'>
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

              {hasCategory && (
                <>
                  <div className='flex items-center'>
                    <p className='font-semibold text-gray-800 dark:text-gray-300'>Category:</p>
                  </div>
                  <div className='flex gap-2 flex-wrap'>
                    {product.categories?.map((category: Category | number) => {
                      if (category !== undefined && typeof category !== 'number') {
                        return (
                          <Badge key={category.id} variant={'outline'} className={'text-blue-500 border-blue-500'}>
                            {category.name}
                          </Badge>
                        );
                      }
                      return null;
                    })}
                  </div>
                </>
              )}

              {hasSubcategory && (
                <>
                  <div className='flex items-center'>
                    <p className='font-semibold text-gray-800 dark:text-gray-300'>Subcategory:</p>
                  </div>
                  <div className='flex gap-2 flex-wrap'>
                    {product.subcategories?.map((subcategory: Subcategory | number) => {
                      if (subcategory !== undefined && typeof subcategory !== 'number') {
                        return (
                          <Badge key={subcategory.id} variant={'outline'} className={'text-yellow-500 border-yellow-500'}>
                            {subcategory.name}
                          </Badge>
                        );
                      }
                      return null;
                    })}
                  </div>
                </>
              )}

              {replacesProducts && (
                <>
                  <div className='flex items-center'>
                    <p className='font-semibold text-gray-800 dark:text-gray-300'>Replaces:</p>
                  </div>
                  <div className='flex gap-2 flex-wrap'>
                    {product.replaces?.map((replacedProduct: ReplacedProduct | number) => {
                      if (replacedProduct !== undefined && typeof replacedProduct !== 'number') {
                        return (
                          <Badge key={replacedProduct.id} variant={'outline'} className='text-gray-400 border-gray-400'>
                            {replacedProduct.name}
                          </Badge>
                        );
                      }
                      return null;
                    })}
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className='flex gap-4 mt-3'>
              <Button asChild >
                <Link target='_blank' href={`/eu-products/${product.slug}`}>More Details</Link>
              </Button>
              {product.link &&
                <Button variant={'outline'} className='border-white'>
                  <Link target='_blank' href={product.link}>Visit website</Link>
                </Button>
              }
            </CardFooter>
          </div>
        </div>
      </Card >


    </>
  )
}

