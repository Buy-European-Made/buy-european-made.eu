import {
  Article,
  Category,
  EuProduct,
  HighlightBlock as HighlightBlockProps,
} from '@/payload-types'
import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { HighlightedElement, HighlightElementsComponent } from './elements/Component'

type Props = HighlightBlockProps

const getProductElements = async (
  productArray: { product?: EuProduct | null | undefined | number }[],
): Promise<HighlightedElement[]> => {
  const ids = productArray
    ?.map((product) => {
      if (!product) return null
      return typeof product.product === 'number' ? product.product : (product.product?.id ?? null)
    })
    .filter((el): el is number => typeof el === 'number')
  const payload = await getPayload({ config })
  const findResult = await payload.find({
    collection: 'eu-products',
    where: {
      id: {
        in: ids,
      },
    },
  })

  return findResult.docs
    .filter((el) => el !== null && typeof el === 'object')
    .map((el) => ({
      name: el.name,
      image: typeof el.logo === 'object' && el.logo?.url ? el.logo?.url : undefined,
      link: el.link,
      summary: el.description ?? undefined,
    }))
}

const getCategoryElements = (categoriesArray: Category[]): HighlightedElement[] => {
  return categoriesArray.map((el) => ({
    name: el.name,
    image: undefined,
    summary: 'Category description',
    link: el.slug ?? '',
  }))
}

const getArticlesElements = (articlesArray: Article[]): HighlightedElement[] => {
  return articlesArray.map((el) => ({
    name: el.name,
    summary: el.shortSummary,
    image:
      typeof el.heroPicture === 'object' && el.heroPicture?.url ? el.heroPicture?.url : undefined,
    link: el.link,
  }))
}

export const HighlightBlock: React.FC<Props> = async ({
  title,
  collection,
  size,
  cardsToShow,
  productArray,
  categoriesArray,
  articlesArray,
}) => {
  let inputElements: HighlightedElement[] = []

  if (collection === 'eu-products' && productArray) {
    inputElements = await getProductElements(productArray)
  } else if (collection === 'articles' && articlesArray) {
    inputElements = getArticlesElements(
      articlesArray.map((el) => el.articles).filter((el) => el !== null && typeof el === 'object'),
    )
  } else if (collection === 'categories' && categoriesArray) {
    inputElements = getCategoryElements(
      categoriesArray
        .map((el) => el.categories)
        .filter((el) => typeof el === 'object' && el !== null),
    )
  }

  return (
    <>
      {inputElements.length !== 0 && (
        <HighlightElementsComponent
          title={title}
          array={inputElements}
          size={size}
          cardsToShow={cardsToShow}
        />
      )}
    </>
  )
}
