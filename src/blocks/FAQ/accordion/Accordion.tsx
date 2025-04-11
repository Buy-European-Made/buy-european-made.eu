"use client"

import React, { useState, useRef, useEffect } from 'react'

import RichText from '@/components/RichText';

const Accordion: React.FC = ({ question, answer, isOpen, onToggle }) => {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [answer]);

  return (
    <>
      <div className="m-auto">
        <div
          className="p-4 cursor-pointer flex items-center justify-between bg-slate-100"
          onClick={onToggle}
        >
          <RichText className="m-0 text-black" data={question} />
          <p className="text-eu-yellow font-bold text-lg">{isOpen ? "-" : "+"}</p>
        </div>
        <div
          className="overflow-hidden transition-max-height duration-300 ease-in-out"
          style={{ maxHeight: isOpen ? `${contentHeight}px` : '0px' }}
        >
          <div ref={contentRef} className="p-4">
            <RichText data={answer} enableGutter={false} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Accordion
