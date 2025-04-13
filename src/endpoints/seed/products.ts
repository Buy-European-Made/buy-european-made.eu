import type { EuProduct } from '@/payload-types'
import type { Media } from '@/payload-types'

const makeFritzProduct = (): Omit<EuProduct, 'createdAt' | 'id' | 'updatedAt'> => {
  return {
    name: 'Fritz Cola',
    description: 'Lorem ipsum',
  }
}

const makeGogProduct = (logo?: Media): Omit<EuProduct, 'createdAt' | 'id' | 'updatedAt'> => {
  return {
    logo: logo,
    name: 'GOG',
    description: 'Lorem ipsum',
  }
}

export { makeFritzProduct, makeGogProduct }
