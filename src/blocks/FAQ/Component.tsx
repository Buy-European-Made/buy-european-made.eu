"use client"

import React, {useState} from 'react'
import Accordion from "./accordion/Accordion"

import type { FAQBlock as FAQBlockProps } from '@/payload-types'
import RichText from '@/components/RichText';

export const FAQBlock: React.FC<FAQBlockProps>= ({title, columns}) => {
  const [open, setOpen] = useState(null);

  const handleToggle = (index) => {
    setOpen((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="container">
      <RichText className="m-0" data={title} />
      {columns.map((item, index) => (
        <Accordion 
          key={index} 
          question={item.question} 
          answer={item.answer} 
          isOpen={open === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}
