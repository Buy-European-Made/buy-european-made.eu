import React from 'react'

import type { EuProduct } from '@/payload-types'

import { Media } from '@/components/Media'

interface ProductCardProps {
  product: EuProduct;
}

export const ProductCard: React.FC<ProductCardProps> = async ({ product }) => {

  return (
    <li className="container mt-16">
      <div className="max-w-[48rem]">
        {product.logo &&
          <Media
            imgClassName='h-32 w-32 border border-border rounded-[0.8rem]'
            resource={product.logo}
          />
        }
        <br />
        Name: {product.name}
        <br />
        Description: {product.description ?? "No description"}
        <br />
        Link: {product.link ?? "No link"}
      </div>
    </li>
  )
}

