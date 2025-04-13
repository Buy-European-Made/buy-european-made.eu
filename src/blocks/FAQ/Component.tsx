'use client'

import React, { useState } from 'react'
import Accordion from './accordion/Accordion'

import type { FAQBlock as FAQBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'

export const FAQBlock: React.FC<FAQBlockProps> = ({ title, columns }) => {
  const [open, setOpen] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setOpen((prevIndex) => (prevIndex === index ? null : index))
  }

  return (
    <div className="container max-w-4xl">
      {title && <RichText className="max-w-[100%] text-center py-4" data={title} />}
      {columns?.map((item, index) => (
        <>
          {item.question && item.answer ? (
            <Accordion
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={open === index}
              onToggle={() => handleToggle(index)}
            />
          ) : null}
        </>
      ))}
    </div>
  )
}
