import type { Product } from '@/payload-types'
import type { Media } from '@/payload-types'

const makeFritzProduct = (): Omit<Product, 'createdAt' | 'id' | 'updatedAt'> => {
  return {
    name: 'Fritz Cola',
    description: 'Lorem ipsum',
  }
}

const makeGogProduct = (logo?: Media): Omit<Product, 'createdAt' | 'id' | 'updatedAt'> => {
  return {
    logo: logo,
    name: 'GOG',
    description: 'Lorem ipsum',
  }
}

export {
  makeFritzProduct,
  makeGogProduct,
}

