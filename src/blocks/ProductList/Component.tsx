import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

import { ProductCard } from './product/Component'


export const ProductsListBlock: React.FC = async () => {

  const payload = await getPayload({ config })
  const findResult = await payload.find({ collection: 'products' })

  if(findResult.docs.length > 0) {
    return (
      <ul>
        {
          findResult.docs.map((product) => {
            return <ProductCard
              key={product.id}
              product={product}
            />
          })
        }
      </ul>
    )
  } else {
    return "No products"
  }
}

