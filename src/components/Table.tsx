import React, { useState, useEffect } from "react";
import { getUsers } from "@/services";
import { User } from "@/types";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";

import Modal from "./Modal";
import { useDebounce, usePagination, useSort } from "@/hooks";

export default function Table() {
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const debouncedSearch = useDebounce(search, 500);
  const { data, error, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredData = data?.filter(
    (user) =>
      user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const {
    page,
    totalPages,
    nextPage,
    prevPage,
    paginatedData,
    resetPagination,
  } = usePagination(filteredData || [], 5);

  const { sortedData, handleSort, sortConfig } = useSort(paginatedData);

  const HandleOpenModal = (user: User) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  useEffect(() => {
    resetPagination();
  }, [debouncedSearch]);

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
                  <table className="min-w-full ">
                    <colgroup>
                      <col className="w-full sm:w-1/3 md:w-1/4" />
                      <col className="sm:w-1/3 md:w-1/4" />
                      <col className="w-full sm:w-1/3 md:w-1/4" />
                      <col className="md:w-1/4" />
                    </colgroup>
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
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white cursor-pointer hidden sm:block"
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
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white cursor-pointer hidden md:block"
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
                      {sortedData.map((item: User) => (
                        <tr
                          key={item?.id + item?.name}
                          onClick={() => HandleOpenModal(item)}
                          className="cursor-pointer"
                        >
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-300 sm:pl-0">
                            {item?.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300 hidden sm:block">
                            {item?.username}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                            {item?.email}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300 hidden md:block">
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
            Showing <span className="font-medium">{(page - 1) * 5 + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(page * 5, filteredData?.length || 0)}
            </span>{" "}
            of <span className="font-medium">{filteredData?.length}</span>{" "}
            results
          </p>
        </div>
        <div className="flex flex-1 justify-between sm:justify-end">
          <button
            onClick={prevPage}
            disabled={page === 1}
            className="relative inline-flex items-center rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-300 ring-1 ring-inset ring-gray-600 hover:bg-gray-500 focus-visible:outline-offset-0 transition-all duration-150 delay-100 disabled:bg-gray-500/10 disabled:text-gray-100/10 "
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={page === totalPages}
            className="relative ml-3 inline-flex items-center rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-300 ring-1 ring-inset ring-gray-600 hover:bg-gray-500 focus-visible:outline-offset-0 transition-all duration-150 delay-100 disabled:bg-gray-500/10 disabled:text-gray-100/10 "
          >
            Next
          </button>
        </div>
      </nav>

      <Modal
        open={openModal}
        setOpen={setOpenModal}
        title={selectedUser?.name ? selectedUser?.name : ""}
      >
        <div className=" flex flex-col items-start ">
          <div className="flex gap-2 p-4 w-full ">
            <h3 className="font-bold  uppercase">username:</h3>
            <span>{selectedUser?.username}</span>
          </div>
          <div className="flex gap-2 border-t p-4 border-t-gray-800 w-full ">
            <h3 className="font-bold  uppercase">website:</h3>
            <span>{selectedUser?.website}</span>
          </div>
          <div className="flex gap-2 border-t p-4 border-t-gray-800 w-full ">
            <h3 className="font-bold  uppercase">phone:</h3>
            <span>{selectedUser?.phone}</span>
          </div>
          <div className="flex gap-2 border-t p-4 border-t-gray-800 w-full ">
            <h3 className="font-bold  uppercase">company name:</h3>
            <span>{selectedUser?.company?.name}</span>
          </div>
          <div className="flex gap-2 border-t p-4 border-t-gray-800 w-full">
            <h3 className="font-bold  uppercase">city:</h3>
            <span>{selectedUser?.address?.city}</span>
          </div>
        </div>
      </Modal>
    </div>
  );
}
