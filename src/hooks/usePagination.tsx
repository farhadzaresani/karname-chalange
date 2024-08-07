import { useRouter } from "next/router";

export function usePagination(data: any[], itemsPerPage: number) {
  const router = useRouter();
  const { query } = router;
  const page = query.page ? Number(query.page) : 1;

  const setPage = (newPage: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...query, page: newPage },
    });
  };
  const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;

  const nextPage = () => {
    page < totalPages && setPage(page + 1);
  };
  const prevPage = () => setPage(Math.max(page - 1, 1));
  const paginatedData = data?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const resetPagination = () => {
    setPage(1);
  };

  return {
    page,
    totalPages,
    nextPage,
    prevPage,
    paginatedData,
    resetPagination,
  };
}
