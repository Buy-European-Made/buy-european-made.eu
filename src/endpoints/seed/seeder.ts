import type { CollectionSlug, Payload, PayloadRequest, File, BasePayload } from 'payload'
import { Category, Country, Media, ReplacedProduct, Subcategory } from '@/payload-types'
import data from './db.json' with { type: 'json' }

type ImportProduct = {
  name: string
  link: string
  categories: string
  replaces: string
  subcategory: string
  producedIn: string
  companyRegistrationCountry: string
  description: string
  summaryShort: string
  logo: string
}

const collections: CollectionSlug[] = [
  'categories',
  'subcategories',
  'eu-products',
  'replaced-products',
  'countries',
  'media',
]

export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  const dbData: ImportProduct[] = data as ImportProduct[]

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`— Clearing collections and globals...`)

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  // TODO: work on the user table as well
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

  // TODO: check if we can skip the sets and use the final map directly
  payload.logger.info(`— Seeding logos..`)
  const logoMap = await seedLogos(payload, dbData)

  payload.logger.info(`— Seeding categories..`)
  const categoryMap = await seedCategories(payload, dbData)

  payload.logger.info(`— Seeding subcategories..`)
  const subcategoryMap = await seedSubcategories(payload, dbData, categoryMap)

  // TODO there are products for which producedIn == ""
  payload.logger.info(`— Seeding countries..`)
  const countryMap = await seedCountries(payload, dbData)

  payload.logger.info(`— Seeding replaced products..`)
  const replacedProdMap = await seedReplacedProducts(payload, dbData, categoryMap)

  payload.logger.info(`— Seeding eu-products...`)
  await seedEuProducts(
    payload,
    dbData,
    logoMap,
    categoryMap,
    subcategoryMap,
    countryMap,
    replacedProdMap,
  )

  payload.logger.info('Seeded database successfully!')
}

async function seedLogos(payload: BasePayload, dbData: ImportProduct[]) {
  const logos: Map<string, number | undefined> = new Map()
  dbData.forEach((element: ImportProduct) => {
    logos.set(element.logo, undefined)
  })

  console.log('..creating logos..')
  const logosPromises = [...logos.keys()].map(async (logo) => {
    let file
    try {
      file = await fetchFileByURL(logo, 5)
    } catch (_error) {
      console.error(`Unable to fetch url ${logo} after all retries.`)
      return
    }
    return payload.create({
      collection: 'media',
      data: { alt: logo, width: 128, height: 128 },
      file: file,
    })
  })
  const logosRes = (await Promise.all(logosPromises)).filter((el) => el !== undefined)

  logosRes.forEach((m: Media) => {
    if (typeof m.alt === 'string') {
      logos.set(m.alt, m.id)
    }
  })
  console.log('Logos map: ', logos)
  return logos
}

async function seedCategories(
  payload: BasePayload,
  dbData: ImportProduct[],
): Promise<Map<string, number>> {
  const categories: Set<string> = new Set()
  dbData.forEach((product: ImportProduct) => {
    categories.add(product.categories)
  })

  console.log('..creating categories..')
  const categoriesPromises = [...categories].map((cat) => {
    return payload.create({
      collection: 'categories',
      data: { name: cat },
    })
  })
  const catRes = (await Promise.all(categoriesPromises)).filter((el) => el !== undefined)

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

  console.log('SubcategoryToCategory map: ', mapSubcategoryCategory)

  console.log('..creating subcategories..')
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
  const countries: Set<string> = new Set()
  dbData.forEach((product: ImportProduct) => {
    const producedIn: string = product.producedIn
    if (producedIn?.includes(',')) {
      producedIn?.split(',').forEach((el) => countries.add(el))
      return
    }
    countries.add(producedIn)

    const companyRegistrationCountry: string = product.companyRegistrationCountry
    if (companyRegistrationCountry?.includes(',')) {
      companyRegistrationCountry?.split(',').forEach((el) => countries.add(el))
      return
    }
    countries.add(companyRegistrationCountry)
  })

  console.log('..creating countries..')
  const countriesPromises = [...countries]
    .filter((c: string) => c.trim() !== '')
    .map((country) => {
      return payload.create({
        collection: 'countries',
        data: { name: country },
      })
    })
  const countryRes = (await Promise.all(countriesPromises)).filter((el) => el !== undefined)

  // crate a map of type: "country": id
  countryRes.forEach((c: Country) => {
    if (typeof c.name === 'string') {
      countryMap.set(c.name, c.id)
    }
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

  console.log('...creating replaced-products...')
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

  const prodResult = (await Promise.all(replacedProdPromise)).filter((el) => el !== undefined)
  prodResult.forEach((r: ReplacedProduct) => {
    if (r.name === undefined || r.name === null) {
      throw new Error(`Got empty name for: ${r} `)
    }
    replacedProductMap.set(r.name, r.id)
  })
  console.log('ReplacedProducts map: ', replacedProductMap)
  return replacedProductMap
}

async function seedEuProducts(
  payload: BasePayload,
  dbData: ImportProduct[],
  logoMap: Map<string, number | undefined>,
  categoryMap: Map<string, number>,
  subcategoryMap: Map<string, number>,
  countryMap: Map<string, number>,
  replacedProdMap: Map<string, number>,
) {
  console.log('...creating eu-products...')
  const prodPromises = dbData.map((product: ImportProduct) => {

    //logo
    const logoIndex: number | undefined = logoMap.get(product.logo)

    // category
    const categoryIndex: number | undefined = categoryMap.get(product.categories)
    const categoryIds = categoryIndex !== undefined ? [categoryIndex] : null

    // subcategory
    const subcategoryIndex: number | undefined = subcategoryMap.get(product.subcategory)
    const subcategoryIds = subcategoryIndex !== undefined ? [subcategoryIndex] : null

    // produced in
    const producedIn: number[] = []
    if (product.producedIn?.includes(',')) {
      product.producedIn
        .split(',')
        .filter((c: string) => c.trim() !== '')
        .forEach((s: string) => producedIn.push(countryMap.get(s)!))
    } else {
      if (product.producedIn.trim() === '') {
        console.log(
          `product ${product.name} has an empty producedIn field, using companyRegistrationCountry of ${product.companyRegistrationCountry}`,
        )
        producedIn.push(countryMap.get(product.companyRegistrationCountry)!)
      } else {
        producedIn.push(countryMap.get(product.producedIn)!)
      }
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
        name: String(product.name),
        categories: categoryIds,
        subcategories: subcategoryIds,
        producedIn: producedIn,
        availableIn: producedIn, // this is just for testing, this value is not present in the current db
        description: product.description,
        replaces: replacedProds,
        logo: logoIndex,
        link: product.link,
      },
    })
  })
  await Promise.all(prodPromises)
}

async function fetchFileByURL(
  url: string,
  retries: number = 3,
  delay: number = 1000,
): Promise<File> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch(url, {
        credentials: 'include',
        method: 'GET',
      })

      if (!res.ok) {
        if (attempt < retries - 1) {
          await new Promise((resolve) => setTimeout(resolve, delay)) // Wait before retrying
          continue // Skip to the next iteration of the loop
        }
      }

      const data = await res.arrayBuffer()

      return {
        name: url.split('/').pop() || `file-${Date.now()}`,
        data: Buffer.from(data),
        mimetype: `image/${url.split('.').pop()}`,
        size: data.byteLength,
      }
    } catch (_error) {
      if (attempt < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay)) // Wait before retrying
        continue // Skip to the next iteration of the loop
      }
    }
  }
  throw new Error(`${url} cannot be downloaded after ${retries} attempts`)
}
