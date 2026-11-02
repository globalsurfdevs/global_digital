type PaginationProps = {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
};

export default function SmartPagination({
  page,
  totalPages,
  setPage,
}: PaginationProps) {
  const getPages = () => {
    const pages: (number | string)[] = [];

    const left = Math.max(1, page - 1);
    const right = Math.min(totalPages, page + 1);

    if (left > 1) {
      pages.push(1);
      if (left > 2) pages.push("...");
    }

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < totalPages) {
      if (right < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPages();

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
      {/* Prev */}
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="rounded-md border px-3 py-1 text-sm hover:bg-gray-100 disabled:opacity-40"
      >
        Prev
      </button>

      {pages.map((p, index) =>
        p === "..." ? (
          <span key={`dots-${index}`} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={`page-${p}`}
            onClick={() => setPage(p as number)}
            className={`rounded-md border px-3 py-1 text-sm ${
              page === p
                ? "border-black bg-black text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        ),
      )}

      {/* Next */}
      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="rounded-md border px-3 py-1 text-sm hover:bg-gray-100 disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
