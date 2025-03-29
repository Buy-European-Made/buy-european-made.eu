
import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { ReplacedProduct } from '@/payload-types'

type Args = {
  params: Promise<{
    slug?: string
  }>
}
export default async function Product({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug: slug = '' } = await paramsPromise
  const sanitizeSlug = (input: string) => input.replace(/[^a-z0-9-]/gi, '') //only letters,numbers and dashes
  const sanitizedSlug = sanitizeSlug(slug)
  const url = '/eu-products/' + sanitizedSlug
  const product = await queryProductsByName({ slug: sanitizedSlug })


  const payload = await getPayload({ config: configPromise })
  const relatedIds = product?.replaces
    ?.filter((replacedProd): replacedProd is ReplacedProduct => {
      return typeof replacedProd !== 'string';
    })
    .map(replacedProd => replacedProd.id);

  const relatedProds = await payload.find({
    collection: 'replaced-products',
    where: {
      id: {
        in: relatedIds
      }
    }
  })

  if (!product) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <h1>{product.name}</h1>
          <p>this replaces the following products:</p>
          <ul>
            {/* here I would like to see some small prooducts cards */}
            {relatedProds.docs?.map((replacedProduct) => {
              return <li className='text-orange-100' key={replacedProduct.id}> {replacedProduct.name} </li>
            })}
          </ul>
        </div>
      </div>
    </article >
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const product = await queryProductsByName({ slug })

  return generateMeta({ doc: product })
}

const queryProductsByName = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'eu-products',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
