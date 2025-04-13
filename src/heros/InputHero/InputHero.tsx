import React from 'react'

import type { Page } from '@/payload-types'
import RichText from '@/components/RichText'
import SearchInput from '@/components/SearchInput'

export const InputHero: React.FC<Page['hero']> = ({ media, richText }) => {
  if (!media || !richText || typeof media === 'number') return null
  return (
    <div
      className="container relative bg-cover bg-center rounded-xl overflow-hidden p-12"
      style={{
        backgroundImage: `url(${media?.url})`,
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 "></div>

      <div className="">
        <RichText className="p-6 text-center text-white relative z-10" data={richText} />
      </div>

      <SearchInput />
    </div>
  )
}
