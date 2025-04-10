"use client"

import React, {useState} from 'react'
import RichText from '@/components/RichText';

import type { TabCards as TabCardsProps } from '@/payload-types'

export const TabCards: React.FC<TabCardsProps> = ({ columns, color }) => {
  const [activeTab, setActiveTab] = useState(0);

  const changeTabText = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="container max-w-4xl overflow-hidden">
      <div className="bg-slate-100 rounded-lg shadow-md">
        <div className="flex tab-container overflow-x-auto">
          {columns.map((item, index) => (
            <div 
              key={index} 
              onClick={() => changeTabText(index)}
              className={`whitespace-nowrap flex-1 py-3 text-center cursor-pointer ${activeTab===index?"border-t-4 border-"+color:"transparent hover:border-blue-200"}`}
            >
              <RichText className="m-0 max-w-[100%] dark:text-black" data={item.title} />
            </div>
          ))}
        </div>
        <div className="text-center py-4 text-gray-700">
          <RichText className="max-w-[100%] dark:text-black" data={columns[activeTab].text} />
        </div>
      </div>
    </div>
  );
};