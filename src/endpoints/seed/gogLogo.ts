import type { Media } from '@/payload-types'

export const gogLogoData: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'GOG logo',
}

