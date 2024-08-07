import React, { useState, useEffect } from "react";
import { getUsers } from "@/services";
import { User } from "@/types";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";

export default function Table() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User;
    direction: "ascending" | "descending";
  } | null>(null);
  const limit = 5;

  const { data, error, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const handleSort = (key: keyof User) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const filteredData = data?.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = filteredData ? Math.ceil(filteredData.length / limit) : 0;

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const paginatedData = filteredData?.slice((page - 1) * limit, page * limit);

  const sortedPaginatedData = React.useMemo(() => {
    if (!paginatedData) return [];
    let sortableData = [...paginatedData];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [paginatedData, sortConfig]);

  useEffect(() => {
    setPage(1); // Reset to first page on new search
  }, [search]);

  return (
    <div className="flex flex-col w-full h-full bg-gray-900 justify-between rounded">
      <div className="w-full !rounded">
        <div className="bg-gray-900 py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-lg lg:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-400"
                  />
                </div>
                <input
                  id="search"
                  name="search"
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search"
                  className="block w-full rounded-md border-0 bg-gray-700 py-1.5 pl-10 pr-3 text-gray-300 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-700 ">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0 cursor-pointer"
                          onClick={() => handleSort("name")}
                        >
                          Name{" "}
                          {sortConfig?.key === "name"
                            ? sortConfig.direction === "ascending"
                              ? "↑"
                              : "↓"
                            : ""}
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white cursor-pointer"
                          onClick={() => handleSort("username")}
                        >
                          Username{" "}
                          {sortConfig?.key === "username"
                            ? sortConfig.direction === "ascending"
                              ? "↑"
                              : "↓"
                            : ""}
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white cursor-pointer"
                          onClick={() => handleSort("email")}
                        >
                          Email{" "}
                          {sortConfig?.key === "email"
                            ? sortConfig.direction === "ascending"
                              ? "↑"
                              : "↓"
                            : ""}
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white cursor-pointer"
                          onClick={() => handleSort("website")}
                        >
                          Website{" "}
                          {sortConfig?.key === "website"
                            ? sortConfig.direction === "ascending"
                              ? "↑"
                              : "↓"
                            : ""}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {sortedPaginatedData.map((item: User) => (
                        <tr key={item?.email}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                            {item?.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                            {item?.username}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                            {item?.email}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                            {item?.website}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {isLoading && (
                    <div className="flex flex-col gap-2">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="w-full p-6 animate-pulse bg-gray-800"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav
        aria-label="Pagination"
        className="flex items-center justify-between border-t border-t-gray-800 bg-gray-800 px-4 py-3 sm:px-6"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">{(page - 1) * limit + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(page * limit, Number(filteredData?.length))}
            </span>{" "}
            of <span className="font-medium">{filteredData?.length}</span>{" "}
            results
          </p>
        </div>
        <div className="flex flex-1 justify-between sm:justify-end">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
          >
            Next
          </button>
        </div>
      </nav>
    </div>
  );
}
