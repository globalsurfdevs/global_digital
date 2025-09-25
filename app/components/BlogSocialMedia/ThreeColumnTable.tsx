// ThreeColumnTable.tsx

import React from 'react';

interface ThreeColumnTableProps {
  title: string;
  subtitle?: string;
  data: {
    [key: string]: string;
  }[];
  paddingBottom?: string;
  columnTitles: string[]; // This will be an array of column titles
}

const ThreeColumnTable: React.FC<ThreeColumnTableProps> = ({
  title,
  subtitle,
  data,
  paddingBottom = 'pb-16',
  columnTitles,
}) => {
  return (
    <section className={`px-4 sm:px-6 lg:px-8 ${paddingBottom}`}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-7">
          <div className="col-span-2 mb-5 xl:mb-0"></div>
          <div className="col-span-5 w-full">
            <h2 className="title-65 mb-[40px]">{title}</h2>
            {subtitle && <p className="text-lg text-gray-600 mb-[30px]">{subtitle}</p>}
            <div className="border border-gray-200 ">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#F2F2F2]">
                  <tr >
                    {columnTitles.map((colTitle, index) => (
                      <th
                        key={index}
                        scope="col"
                        className={`px-6 py-3 text-left text-font19 font-medium text-dark capitalize tracking-wider ${
                          index < columnTitles.length - 1 ? 'border-r border-gray-200' : ''
                        }`}
                      >
                        {colTitle}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((row, index) => (
                    <tr key={index}>
                      {columnTitles.map((colTitle, colIndex) => (
                        <td
                          key={colIndex}
                          className={`px-6 py-4  ${
                            colIndex < columnTitles.length - 1 ? 'border-r border-gray-200' : ''
                          }`}
                        >
                          <div className="text-font19 text-[#77787B] capitalize">
                            {row[colTitle]}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeColumnTable;