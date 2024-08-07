import { useState } from "react";

export function usePagination(data: any[], itemsPerPage: number) {
  const [page, setPage] = useState(1);
  const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;

  const nextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const paginatedData = data?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return { page, totalPages, nextPage, prevPage, paginatedData };
}
