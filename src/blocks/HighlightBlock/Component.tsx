
import { Article, EuProduct, HighlightBlock as HighlightBlockProps } from '@/payload-types'
import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { HighlightedElement, HighlightElementsComponent } from './elements/Component'

type Props = HighlightBlockProps


export const HighlightBlock: React.FC<Props> = async ({ title, collection, size, cardsToShow, productArray, categoriesArray, articlesArray }) => {

  let inputElements: HighlightedElement[] = []
  if (collection === 'eu-products' && productArray) {
    const ids = productArray?.map(product => {
      if (product === null || product === undefined) return null
      return typeof product === 'number' ? product : product.product
    }).filter(el => typeof el === 'number')
    const payload = await getPayload({ config })
    const findResult = await payload.find({
      collection: collection,
      where: {
        id: {
          in: ids
        }
      }
    })

    inputElements = findResult.docs
      .filter((el): el is EuProduct => el !== null && typeof el === 'object')
      .map((el) => ({
        name: el.name,
        image: typeof el.logo === 'object' && el.logo?.url ? el.logo?.url : undefined,
        link: el.link,
        summary: el.description ?? undefined
      }))
  }

  if (collection === 'articles' && articlesArray) {
    const array = articlesArray.map(el => el.articles)
    inputElements = array.filter((el) => el !== null && typeof el === 'object').map(el => ({
      name: el.name,
      summary: el.shortSummary,
      image: typeof el.heroPicture === 'object' && el.heroPicture?.url ? el.heroPicture?.url : undefined,
      link: el.link
    }))
  }

  if (collection === 'categories' && categoriesArray) {
    const array = categoriesArray.map(el => el.categories)
    inputElements = array.filter(el => el !== null && typeof el === 'object').map(el => ({
      name: el.name,
      image: undefined,
      summary: 'Category description',
      link: 'https://www.google.com'
    }))
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
