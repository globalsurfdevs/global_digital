import React from "react";

type TableValue = React.ReactNode;

interface TableColumn {
  key: string;
  title: string;
  headerClassName?: string;
  cellClassName?: string;
}

interface CustomTableProps {
  data: Record<string, TableValue>[];
  columns?: TableColumn[];
  columnTitles?: string[];
  className?: string;
  tableWrapperClassName?: string;
  emptyMessage?: string;
}

const CustomTable: React.FC<CustomTableProps> = ({
  data,
  columns,
  columnTitles,
  className = "",
  tableWrapperClassName = "",
  emptyMessage = "No data available.",
}) => {
  const resolvedColumns: TableColumn[] =
    columns && columns.length > 0
      ? columns
      : (columnTitles ?? []).map((title) => ({
          key: title,
          title,
        }));

  return (
    <section className={className}>
      <div
        className={`border border-gray-200 overflow-x-auto ${tableWrapperClassName}`.trim()}
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#F2F2F2]">
            <tr>
              {resolvedColumns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-left text-font19 font-medium text-dark tracking-wider border-r last:border-r-0 border-gray-200 ${column.headerClassName ?? ""}`.trim()}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {resolvedColumns.map((column) => (
                    <td
                      key={`${rowIndex}-${column.key}`}
                      className={`px-6 py-4 align-top border-r last:border-r-0 border-gray-200 ${column.cellClassName ?? ""}`.trim()}
                    >
                      <div className="text-font19 text-[#77787B]">
                        {row[column.key] ?? ""}
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={Math.max(resolvedColumns.length, 1)}
                  className="px-6 py-4 text-font19 text-[#77787B]"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CustomTable;
