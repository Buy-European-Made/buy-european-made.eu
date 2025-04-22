import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

import { loadSearchParams } from '@/app/(frontend)/searchParams'
import type { SearchParams } from 'nuqs/server'
import { ProductListClient } from './product/ProductList.client'

export const ProductsListBlock: React.FC<{
  searchParams: Promise<SearchParams>
}> = async ({ searchParams }) => {
  const { s } = await loadSearchParams(searchParams)
  const payload = await getPayload({ config })

  let initialProducts
  if (s) {
    initialProducts = await payload.find({
      collection: 'eu-products',
      limit: 100,
      where: {
        or: [
          {
            name: {
              contains: s,
            },
          },
          {
            description: {
              contains: s,
            },
          },
          {
            'tags.name': {
              contains: s,
            },
          },
        ],
      },
    })
  } else {
    initialProducts = await payload.find({ collection: 'eu-products', limit: 100 })
  }

  return <ProductListClient products={initialProducts.docs} />
}
