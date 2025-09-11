import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Country, EuProduct } from '@/payload-types'

import { CountryPage } from '@/Globals/CountryPage/Component'

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
  const url = '/countries/' + sanitizedSlug
  const country = await queryCountryByName({ slug: sanitizedSlug })

  if (!country) return <PayloadRedirects url={url} />

  const producedProducts = getProducedProducts(country)

  return (
    <article className="pt-16 pb-16">
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <label>Country page</label>
      {<CountryPage country={country} />}
      <label>Produces products</label>
      {producedProducts?.map((product) => {
        return <span key={product}>{product},</span>
      })}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const country = await queryCountryByName({ slug })

  return generateMeta({ doc: country })
}

function getProducedProducts(country: Country) {
  console.log(country)
  console.log(country.producedProducts?.docs)

  return country?.producedProducts?.docs
    ?.filter((prod): prod is EuProduct => {
      return typeof prod !== 'string'
    })
    .map((prod: EuProduct) => prod.name)
}

const queryCountryByName = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'countries',
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
