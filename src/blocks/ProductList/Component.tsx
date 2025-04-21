import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

import { ProductCard } from './product/Component'

export const ProductsListBlock: React.FC = async () => {
  const payload = await getPayload({ config })
  const findResult = await payload.find({ collection: 'eu-products', limit: 100 })

  if (findResult.docs.length > 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-3">
        {findResult.docs.map((product) => {
          return <ProductCard key={product.id} product={product} />
        })}
      </div>
    )
  } else {
    return 'No products'
  }
}
