import { getPayload } from 'payload'
import configPromise from '@payload-config'

import React from 'react'
import { RenderCountryBlocks } from '@/blocks/RenderBlocks'

import type { CountryPage } from '@/payload-types'

import { CountryBlockProps } from '@/blocks/CountryDescriptionBlock/Component'

export async function CountryPage({ country }: CountryBlockProps) {
  const payload = await getPayload({ config: configPromise })

  const page = await payload.findGlobal({ slug: 'countryPage' })

  return <RenderCountryBlocks blocks={page.layout} country={country}></RenderCountryBlocks>
}
