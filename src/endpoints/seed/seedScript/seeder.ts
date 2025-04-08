import { Category, Country, ReplacedProduct, Subcategory } from '@/payload-types'
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
// TODO remove tsnode, it is not needed anymore
console.log('seeding started')

let replacedProducts: string[] = []
replacedProducts = dbData.map((product: ImportProduct) => {
  if (product.replaces?.includes(',')) {
    replacedProducts = [...product.replaces?.split(','), ...replacedProducts]
  }
  return product.replaces || ''
})

import type { CollectionSlug, Payload, PayloadRequest, File, BasePayload } from 'payload'

const collections: CollectionSlug[] = [
  'categories',
  'subcategories',
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

  payload.logger.info(`— Seeding subcategories..`)
  const subcategoryMap = await seedSubcategories(payload, dbData, categoryMap)

  payload.logger.info(`— Seeding countries..`)
  const countryMap = await seedCountries(payload, dbData)

  payload.logger.info(`— Seeding replaced products..`)
  const replacedProdMap = await seedReplacedProducts(payload, dbData, categoryMap)

  payload.logger.info(`— Seeding products...`)
  await seedEuProducts(payload, dbData, categoryMap, subcategoryMap, countryMap, replacedProdMap)

  payload.logger.info('Seeded database successfully!')
}

async function seedCategories(
  payload: BasePayload,
  dbData: ImportProduct[],
): Promise<Map<string, number>> {
  // get all existing categories and deduplicate
  const categories = new Set()
  dbData.forEach((product: ImportProduct) => {
    categories.add(product.categories)
  })

  const categoriesPromises = [...categories].map((cat) => {
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

async function seedSubcategories(
  payload: BasePayload,
  dbData: ImportProduct[],
  categoryMap: Map<string, number>,
): Promise<Map<string, number>> {
  // get all existing categories and deduplicate
  const subcategories: Set<string> = new Set()
  const mapSubcategoryCategory = new Map<string, Set<number | null>>()
  dbData.forEach((product: ImportProduct) => {
    if (
      product.subcategory !== null &&
      product.subcategory !== undefined &&
      product.subcategory.trim() !== ''
    ) {
      subcategories.add(product.subcategory)

      const existingIds =
        mapSubcategoryCategory.get(product.subcategory) === undefined
          ? new Set<number | null>()
          : mapSubcategoryCategory.get(product.subcategory)!

      const categoryId =
        categoryMap.get(product.categories) === null ? null : categoryMap.get(product.categories)!
      mapSubcategoryCategory.set(product.subcategory, existingIds.add(categoryId))
    }
  })

  console.log('Subcategory map: ', mapSubcategoryCategory)

  const categoriesPromises = [...subcategories].map((subcat: string) => {
    const mainCategories: Set<number | null> =
      mapSubcategoryCategory.get(subcat) === undefined
        ? new Set()
        : mapSubcategoryCategory.get(subcat)!
    return payload.create({
      collection: 'subcategories',
      data: {
        name: String(subcat),
        mainCategory: [...mainCategories].filter((e) => e !== null),
      },
    })
  })
  const catRes = (await Promise.all(categoriesPromises)).filter(
    (el) => el !== null && el !== undefined,
  )

  // create a map: category: id
  const subcategoryMap: Map<string, number> = new Map()
  catRes.forEach((c: Subcategory) => {
    subcategoryMap.set(c.name, c.id)
  })
  console.log('Subcategory map: ', subcategoryMap)
  return subcategoryMap
}

async function seedCountries(
  payload: BasePayload,
  dbData: ImportProduct[],
): Promise<Map<string, number>> {
  const countryMap: Map<string, number> = new Map()

  // get all countries included in the existing products and deduplicate
  const countries = new Set()
  dbData.forEach((product: ImportProduct) => {
    const producedIn: string = product.producedIn
    if (producedIn?.includes(',')) {
      producedIn?.split(',').forEach((el) => countries.add(el))
      return
    }
    countries.add(producedIn)
  })

  const countriesPromises = [...countries].map((country) => {
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
  let replaces: Set<string>
  const createdProducts: string[] = []
  const replacedProdPromise: Promise<ReplacedProduct>[] = []
  dbData.forEach((prod: ImportProduct) => {
    replaces = new Set()
    if (prod.replaces.includes(',')) {
      prod.replaces.split(',').forEach((el) => replaces.add(el))
    } else {
      replaces.add(prod.replaces)
    }

    ;[...replaces].forEach((r: string) => {
      if (r === null || r === undefined) return
      if (r.trim() === '' || createdProducts.includes(r)) {
        return
      }

      createdProducts.push(r)
      // create the product only if we did not already
      const promise = payload.create({
        collection: 'replaced-products',
        data: {
          name: r,
          categories: [categoryMap.get(prod.categories)!],
        },
      })
      replacedProdPromise.push(promise)
    })
  })

  const prodResult = await Promise.all(replacedProdPromise)
  prodResult.forEach((r: ReplacedProduct | null) => {
    if (r === null || r === undefined) return
    replacedProductMap.set(r.name!, r.id)
  })
  console.log('ReplacedProducts map: ', replacedProductMap)
  return replacedProductMap
}

async function seedEuProducts(
  payload: BasePayload,
  dbData: ImportProduct[],
  categoryMap: Map<string, number>,
  subcategoryMap: Map<string, number>,
  countryMap: Map<string, number>,
  replacedProdMap: Map<string, number>,
) {
  const prodPromises = dbData.map((product: ImportProduct) => {
    // category
    const categoryIndex: number | undefined = categoryMap.get(product.categories)
    const categoryIds = categoryIndex !== undefined ? [categoryIndex] : null

    // subcategory
    const subcategoryIndex: number | undefined = subcategoryMap.get(product.subcategory)
    const subcategoryIds = subcategoryIndex !== undefined ? [subcategoryIndex] : null

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
      product.replaces.split(',').forEach((s: string) => {
        const foundElement = replacedProdMap.get(s)
        if (foundElement) {
          replacedProds.push(foundElement)
        }
      })
    } else {
      const foundElement = replacedProdMap.get(product.replaces)
      if (foundElement) replacedProds.push(foundElement)
    }

    return payload.create({
      collection: 'eu-products',
      data: {
        name: product.name,
        categories: categoryIds,
        subcategories: subcategoryIds,
        producedIn: producedIn,
        availableIn: producedIn, // this is just for testing, this value is not present in the current db
        description: product.description,
        replaces: replacedProds,
      },
    })
  })
  await Promise.all(prodPromises)
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
