
import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { BasePayload, getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Tag, Category, EuProduct, ReplacedProduct } from '@/payload-types'
import { ProductCard } from '@/blocks/ProductList/product/Component'

type Args = {
  params: Promise<{
    slug?: string
  }>
}
export default async function Product({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  console.log("isEnabled", draft)
  const { slug: slug = '' } = await paramsPromise
  const sanitizeSlug = (input: string) => input.replace(/[^a-z0-9-]/gi, '') //only letters,numbers and dashes
  const sanitizedSlug = sanitizeSlug(slug)
  const url = '/eu-products/' + sanitizedSlug
  const product = await queryProductsByName({ slug: sanitizedSlug })

  if (!product) return <PayloadRedirects url={url} />

  return (
    <div className="mx-6">
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <ProductCard product={product} />
    </div >
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const product = await queryProductsByName({ slug })

  return generateMeta({ doc: product })
}

const queryProductsByName = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'eu-products',
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })
  return result.docs?.[0] || null
})
