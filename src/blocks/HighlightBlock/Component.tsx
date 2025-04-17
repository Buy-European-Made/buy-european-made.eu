
import { Category, EuProduct, HighlightBlock as HighlightBlockProps } from '@/payload-types'
import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { HighlightedElement, HighlightElementsComponent } from './elements/Component'

type Props = HighlightBlockProps


export const HighlightBlock: React.FC<Props> = async ({ title, collection, size, productArray, categoriesArray, articlesArray }) => {
  // here I want to created a unified type like: HighlightedElement that contains name, image, link
  // i can grab the info and map each type to the newly created  type
  // this type then gets passed to the component which is going to be type agnostic
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
      .filter((el): el is EuProduct => el.name != null && el.logo != null && el.logo.url !== null && el.link != null)
      .map((el) => ({
        name: el.name,
        image: typeof el.logo === 'number' ? null : el.logo?.url,
        link: el.link,
        summary: el.description
      }))
  }
  if (collection === 'articles' && articlesArray) {
    console.log(articlesArray)
    inputElements = articlesArray.filter((el) => typeof el !== 'number').map(el => ({
      name: el.articles?.name ?? "Name not found",
      summary: el.articles?.shortSummary,
      image: typeof el.articles === 'number' ? null : el.articles?.heroPicture?.url,
      link: el?.articles.link
    }))
  }

  if (collection === 'categories' && categoriesArray) {
    console.log(categoriesArray)
    inputElements = categoriesArray.map(el => ({
      name: el.categories?.name ?? "Name not found",
      image: null,
      summary: 'Category description',
      link: 'https://www.google.com'
    }))
  }

  console.log(inputElements)

  return (
    <>
      {
        inputElements.length !== 0 &&
        <HighlightElementsComponent title={title} array={inputElements} size={size} />
      }
    </>
  )
}
