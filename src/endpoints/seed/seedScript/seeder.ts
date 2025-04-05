import { Category, Country, EuProduct, ReplacedProduct } from '@/payload-types'
import dbData from './db.json' with { type: 'json' }

type ImportProduct = {
  name: string
  link: string
  categories: string
  replaces: string
  subcategory: string
  producedIn: string
  description: string
  summaryShort: string
  logo: string
}

console.log('seeding started')

let replacedProducts: string[] = []
replacedProducts = dbData.map((product: ImportProduct) => {
  if (product.replaces?.includes(',')) {
    replacedProducts = [...product.replaces?.split(','), ...replacedProducts]
  }
  return product.replaces || ''
})
const deduReplacedProducts = [...new Set(replacedProducts.flat())]
console.log('Found replaced products:')
console.log(deduReplacedProducts)

import type { CollectionSlug, Payload, PayloadRequest, File } from 'payload'

const collections: CollectionSlug[] = [
  'categories',
  'eu-products',
  // 'replaced-products',
  'countries',
]

// const globals: GlobalSlug[] = ['header', 'footer']
//
// // Next.js revalidation errors are normal when seeding the database without a server running
// // i.e. running `yarn seed` locally instead of using the admin UI within an active app
// // The app is not running to revalidate the pages and so the API routes are not available
// // These error messages can be ignored: `Error hitting revalidate route for...`
export const mySeed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`— Clearing collections and globals...`)

  // clear the database
  // await Promise.all(
  //   globals.map((global) =>
  //     payload.updateGlobal({
  //       slug: global,
  //       data: {
  //         navItems: [],
  //       },
  //       depth: 0,
  //       context: {
  //         disableRevalidate: true,
  //       },
  //     }),
  //   ),
  // )

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  // payload.logger.info(`— Seeding demo author and user...`)

  // await payload.delete({
  //   collection: 'users',
  //   depth: 0,
  //   where: {
  //     email: {
  //       equals: 'demo-author@example.com',
  //     },
  //   },
  // })

  const categories: string[] = dbData.map((product: ImportProduct) => {
    return product.categories
  })
  const deduCategories = [...new Set(categories)]
  console.log('Found categories:')
  console.log(deduCategories)

  const categoryMap: Map<string, number> = new Map<string, number>()
  const categoriesPromises = deduCategories.map((cat, index) => {
    categoryMap.set(cat, index)
    const result = payload.create({
      collection: 'categories',
      data: { id: index, name: cat },
    })
    return result
  })
  const catRes = await Promise.all(categoriesPromises)
  catRes.forEach((c: Category) => {
    categoryMap.set(c.name, c.id)
  })
  console.log('Category map: ', categoryMap)

  payload.logger.info(`— Seeding countries..`)

  const countryMap: Map<string, number> = new Map()
  const countries: string[] = []
  dbData.forEach((product: ImportProduct) => {
    const producedIn: string = product.producedIn
    if (producedIn?.includes(',')) {
      producedIn?.split(',').forEach((el) => countries.push(el))
      return
    }
    countries.push(producedIn)
  })

  const deduCountries = [...new Set(countries.flat())]
  console.log('Found countries:')
  console.log(deduCountries)
  const countriesPromises = deduCountries.map((country, index) => {
    const result = payload.create({
      collection: 'countries',
      data: { id: index, name: country },
    })
    return result
  })
  const countryRes = await Promise.all(countriesPromises)
  countryRes.forEach((c: Country) => {
    countryMap.set(c.name, c.id)
  })
  console.log('Countries map: ', countryMap)

  payload.logger.info(`— Seeding products...`)

  const prodPromises = dbData.map((product: ImportProduct) => {
    console.log('creating product:', product)
    const categoryIndex: number =
      categoryMap.get(product.categories) || categoryMap.get('Miscellaneous')
    const producedIn: number[] = []
    if (product.producedIn?.includes(',')) {
      product.producedIn.split(',').forEach((s: string) => producedIn.push(countryMap.get(s) || 0))
    } else {
      producedIn.push(countryMap.get(product.producedIn) || 0)
    }

    return payload.create({
      collection: 'eu-products',
      data: {
        name: product.name,
        categories: [categoryIndex],
        producedIn: producedIn,
        description: product.description,
      },
    })
  })
  const prodResult = await Promise.all(prodPromises)
  console.log(prodResult)

  payload.logger.info('Seeded database successfully!')
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}
