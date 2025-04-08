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
    <div className="container max-w-4xl">
      <div className="bg-slate-100 rounded-lg shadow-md">
        <div className="flex tab-container overflow-x-auto">
          {columns.map((item, index) => (
            <div 
              key={index} 
              onClick={() => changeTabText(index)}
              className={`whitespace-nowrap flex-1 py-3 text-center cursor-pointer border-t-4 border-${activeTab===index?color:"transparent"}`}
            >
              <RichText className="m-0 max-w-[100%] caret-red-50" data={item.title} />
            </div>
          ))}
        </div>
        <div className="text-center py-4 text-gray-700">
          <RichText className="max-w-[100%]" data={columns[activeTab].text} />
        </div>
      </div>
    </div>
  );
};