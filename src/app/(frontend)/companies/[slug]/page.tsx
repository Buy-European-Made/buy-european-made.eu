import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Brand, Company, EuProduct } from '@/payload-types'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

const payload = await getPayload({ config: configPromise })

export default async function CompanyPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug: slug = '' } = await paramsPromise
  const sanitizeSlug = (input: string) => input.replace(/[^a-z0-9-]/gi, '') //only letters,numbers and dashes
  const sanitizedSlug = sanitizeSlug(slug)
  const url = '/companies/' + sanitizedSlug

  const company = await queryCompanyByName({ slug: sanitizedSlug })
  if (!company) return <PayloadRedirects url={url} />

  const ownedBrands = getBrands(company)
  const producedProducts = getProducedProducts(ownedBrands).flat()
  return (
    <article className="pt-16 pb-16">
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      {ownedBrands?.map((b) => {
        return <p key={b.id}>{b.name}</p>
      })}
      {producedProducts?.map((p) => {
        return <p key={p.id}>{p.name}</p>
      })}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const company = await queryCompanyByName({ slug })

  return generateMeta({ doc: company })
}

function getProducedProducts(brands: Brand[]) {
  return (
    brands?.map((b: Brand) => {
      return (
        b?.produces?.docs?.filter((euProd): euProd is EuProduct => {
          return typeof euProd !== 'number'
        }) || []
      )
    }) || []
  )
}

function getBrands(company: Company) {
  return (
    company?.ownBrands?.filter((brand): brand is Brand => {
      return typeof brand !== 'number'
    }) || []
  )
}

const queryCompanyByName = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const result = await payload.find({
    collection: 'companies',
    draft,
    depth: 2,
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
