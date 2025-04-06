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
// TODO replace list that are deduplicated with set directly
console.log('seeding started')

let replacedProducts: string[] = []
replacedProducts = dbData.map((product: ImportProduct) => {
  if (product.replaces?.includes(',')) {
    replacedProducts = [...product.replaces?.split(','), ...replacedProducts]
  }
  return product.replaces || ''
})
const deduReplacedProducts = [...new Set(replacedProducts.flat())]

import type { CollectionSlug, Payload, PayloadRequest, File, BasePayload } from 'payload'

const collections: CollectionSlug[] = [
  'categories',
  'eu-products',
  'replaced-products',
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

  payload.logger.info(`— Seeding categories..`)
  const categoryMap = await seedCategories(payload, dbData)

  payload.logger.info(`— Seeding countries..`)
  const countryMap = await seedCountries(payload, dbData)

  payload.logger.info(`— Seeding replaced products..`)
  const replacedProdMap = await seedReplacedProducts(payload, dbData, categoryMap)

  payload.logger.info(`— Seeding products...`)
  await seedEuProducts(payload, dbData, categoryMap, countryMap, replacedProdMap)

  payload.logger.info('Seeded database successfully!')
}

async function seedCategories(
  payload: BasePayload,
  dbData: ImportProduct[],
): Promise<Map<string, number>> {
  // get all existing categories and deduplicate
  const categories: string[] = dbData.map((product: ImportProduct) => {
    return product.categories
  })
  const deduCategories = [...new Set(categories)]

  const categoriesPromises = deduCategories.map((cat, index) => {
    // TODO can we remove the ID?
    return payload.create({
      collection: 'categories',
      data: { name: cat },
    })
  })
  const catRes = await Promise.all(categoriesPromises)

  // create a map: category: id
  const categoryMap: Map<string, number> = new Map()
  catRes.forEach((c: Category) => {
    categoryMap.set(c.name, c.id)
  })
  console.log('Category map: ', categoryMap)
  return categoryMap
}

async function seedCountries(
  payload: BasePayload,
  dbData: ImportProduct[],
): Promise<Map<string, number>> {
  const countryMap: Map<string, number> = new Map()

  // get all countries included in the existing products and deduplicate
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

  const countriesPromises = deduCountries.map((country, index) => {
    return payload.create({
      collection: 'countries',
      data: { name: country },
    })
  })
  const countryRes = await Promise.all(countriesPromises)

  // crate a map of type: "country": id
  countryRes.forEach((c: Country) => {
    countryMap.set(c.name, c.id)
  })
  console.log('Countries map: ', countryMap)
  return countryMap
}

async function seedReplacedProducts(
  payload: BasePayload,
  dbData: ImportProduct[],
  categoryMap: Map<string, number>,
): Promise<Map<string, number>> {
  const replacedProductMap: Map<string, number> = new Map()
  const replacedProds = new Set<string>()
  dbData.forEach((prod: ImportProduct) => {
    const replaces = prod.replaces
    if (replaces.includes(',')) {
      replaces.split(',').forEach((el) => replacedProds.add(el))
      return
    }
    replacedProds.add(replaces)
  })

  const resplacedProdPromises = [...replacedProds].map((replProd, index) => {
    return payload.create({
      collection: 'replaced-products',
      data: {
        name: replProd,
      },
    })
  })

  const prodResult = await Promise.all(resplacedProdPromises)
  prodResult.forEach((r: ReplacedProduct) => {
    replacedProductMap.set(r.name, r.id)
  })
  console.log(replacedProductMap)
  return replacedProductMap
}

async function seedEuProducts(
  payload: BasePayload,
  dbData: ImportProduct[],
  categoryMap: Map<string, number>,
  countryMap: Map<string, number>,
  replacedProdMap: Map<string, number>,
) {
  const prodPromises = dbData.map((product: ImportProduct) => {
    // category
    const categoryIndex: number = categoryMap.get(product.categories)!
    // produced in
    const producedIn: number[] = []
    if (product.producedIn?.includes(',')) {
      product.producedIn.split(',').forEach((s: string) => producedIn.push(countryMap.get(s)!))
    } else {
      producedIn.push(countryMap.get(product.producedIn)!)
    }
    // replaced product
    const replacedProds: number[] = []
    if (product.replaces?.includes(',')) {
      product.replaces
        .split(',')
        .forEach((s: string) => replacedProds.push(replacedProdMap.get(s)!))
    } else {
      replacedProds.push(replacedProdMap.get(product.replaces)!)
    }

    console.log(
      `for product: ${product.name}, replacedProds: ${replacedProds}, original: ${product.replaces}`,
    )

    return payload.create({
      collection: 'eu-products',
      data: {
        name: product.name,
        categories: [categoryIndex],
        producedIn: producedIn,
        description: product.description,
        replaces: replacedProds,
      },
    })
  })
  const prodResult = await Promise.all(prodPromises)
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
