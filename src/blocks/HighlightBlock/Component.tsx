
import { HighlightBlock as HighlightBlockProps } from '@/payload-types'
import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { HighlightedElement, HighlightElementsComponent } from './elements/Component'

type Props = HighlightBlockProps

const getProductElements = async (productArray: any[]): Promise<HighlightedElement[]> => {

  const ids = productArray?.map(product => {
    if (product === null || product === undefined) return null
    return typeof product === 'number' ? product : product.product
  }).filter(el => typeof el === 'number')
  const payload = await getPayload({ config })
  const findResult = await payload.find({
    collection: 'eu-products',
    where: {
      id: {
        in: ids
      }
    }
  })

  return findResult.docs
    .filter((el) => el !== null && typeof el === 'object')
    .map((el) => ({
      name: el.name,
      image: typeof el.logo === 'object' && el.logo?.url ? el.logo?.url : undefined,
      link: el.link,
      summary: el.description ?? undefined
    }))
}

const getCategoryElements = (categoriesArray: any[]): HighlightedElement[] => {
  const array = categoriesArray.map((el: { categories: any }) => el.categories)
  return array.filter((el: null) => el !== null && typeof el === 'object').map((el: { name: any }) => ({
    name: el.name,
    image: undefined,
    summary: 'Category description',
    link: 'https://www.google.com'
  }))
}

const getArticlesElements = (articlesArray: any[]): HighlightedElement[] => {
  const array = articlesArray.map(el => el.articles)
  return array.filter((el) => el !== null && typeof el === 'object').map(el => ({
    name: el.name,
    summary: el.shortSummary,
    image: typeof el.heroPicture === 'object' && el.heroPicture?.url ? el.heroPicture?.url : undefined,
    link: el.link
  }))
}
export const HighlightBlock: React.FC<Props> = async ({ title, collection, size, cardsToShow, productArray, categoriesArray, articlesArray }) => {

  let inputElements: HighlightedElement[] = []

  if (collection === 'eu-products' && productArray) {
    inputElements = await getProductElements(productArray)
  }
  else if (collection === 'articles' && articlesArray) {
    inputElements = getArticlesElements(articlesArray)
  }
  else if (collection === 'categories' && categoriesArray) {
    inputElements = getCategoryElements(categoriesArray)
  }

  return (
    <>
      {
        inputElements.length !== 0 &&
        <HighlightElementsComponent title={title} array={inputElements} size={size} cardsToShow={cardsToShow} />
      }
    </>
  )
}
