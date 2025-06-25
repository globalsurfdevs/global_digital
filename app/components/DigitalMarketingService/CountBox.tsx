"use client";
import React, { useState } from 'react'

export default function CountBox() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const boxes = [
    { value: 25, symbol: '+', label: 'Active Campaigns' },
    { value: 35, symbol: '+', label: 'Experts Across Disciplines' },
    { value: 80, symbol: '%', label: 'Projects Achieved 8x–12x ROAS' },
  ];

  return (
    <section className='pb-16 lg:pb-140'>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4">
          {boxes.map((box, idx) => {
            // Determine if this box should be active
            const isActive = activeIndex === null ? idx === 0 : activeIndex === idx;
            return (
              <div
                key={box.label}
                className="flex flex-col gap-2 lg:gap-8 border-r border-black/10 last:border-r-0 lg:pl-10 first:pl-0 group"
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <h3 className='text-font65 font-normal leading-[1.076923076923077]'>
                  {box.value}{' '}
                  <span
                    className={`transition-colors ${
                      isActive ? 'text-primary' : 'text-black'
                    }`}
                  >
                    {box.symbol}
                  </span>
                </h3>
                <p className='text-font25 font-normal leading-[1.3] text-gray1'>{box.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}