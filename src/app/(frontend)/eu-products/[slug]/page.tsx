import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { BasePayload, getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Tag, Category, EuProduct, ReplacedProduct, Subcategory } from '@/payload-types'

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

  if (!product) return <PayloadRedirects url={url} />

  const payload = await getPayload({ config: configPromise })
  const relatedProds = await getRelatedProducts(product, payload)
  const categories = getCategories(product)
  const subcategories = getSubcategories(product)
  const tags = getTags(product)

  return (
    <article className="pt-16 pb-16">
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="flex text-gray-700 flex-col p-6 bg-white shadow-md rounded-lg w-full max-w-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <span className="text-xl font-bold">{product.name}</span>
            </div>
            <div className="ml-4">
              {/* TODO: use proper Image component and logo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="path_to_your_logo.png" alt="logo" className="w-10 h-10 rounded-full" />
            </div>
          </div>
          <div className="text-sm text-gray-600 mb-2">Video Game Store • Poland 🇵🇱</div>
          <p className="my-4 text-gray-700">{product.description}</p>
          <div className="flex flex-col">
            <span className="text-gray-500">Alternative to</span>
            <div className="flex">
              {relatedProds.map((alternative, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded mr-2">
                  {alternative.name}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-500">Categories:</span>
            <div className="flex">
              {categories?.map((cat, index) => (
                <span key={index} className="px-2 py-1 bg-orange-100 text-orange-700 rounded mr-2">
                  {cat}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">Subcategories:</span>
            <div className="flex">
              {subcategories?.map((subc: string, index: number) => (
                <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded mr-2">
                  {subc}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-500">Tags:</span>
            <div className="flex">
              {tags?.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-violet-100 text-violet-700 rounded mr-2">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex">
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Visit site
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

function getCategories(product: EuProduct | null) {
  return product?.categories
    ?.filter((c): c is Category => {
      return typeof c !== 'string'
    })
    .map((c) => c.name)
}

function getSubcategories(product: EuProduct) {
  return product?.subcategories
    ?.filter((subc): subc is Subcategory => {
      return typeof subc !== 'string'
    })
    .map((subc: Subcategory) => subc.name)
}

function getTags(product: EuProduct) {
  return product?.tags
    ?.filter((t): t is Tag => {
      return typeof t !== 'string'
    })
    .map((t) => t.name)
}

async function getRelatedProducts(product: EuProduct, payload: BasePayload) {
  const relatedIds = product?.replaces
    ?.filter((replacedProd): replacedProd is ReplacedProduct => {
      return typeof replacedProd !== 'string'
    })
    .map((replacedProd) => replacedProd.id)

  const relatedProds = await payload.find({
    collection: 'replaced-products',
    where: {
      id: {
        in: relatedIds,
      },
    },
  })
  return relatedProds.docs
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
