import React from 'react'

import type { HeroBlock as HeroBlockProps } from '@/payload-types'
import RichText from '@/components/RichText';
import SearchInput from './searchInput/SearchInput';

export const HeroBlock: React.FC<HeroBlockProps>= ({title, imageUrl}) => {
  return (
    <div className="container relative bg-cover bg-center rounded-xl overflow-hidden p-12" style={{
      backgroundImage: `url(${imageUrl?.url})`,
    }}>
      {/* overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 "></div>

      <div className="">
        <RichText className="p-6 text-center text-white relative z-10" data={title} />
      </div>
      <SearchInput/>
    </div>
  );
}
