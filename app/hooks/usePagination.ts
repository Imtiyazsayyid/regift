import { useState, useEffect } from "react";

const usePagination = <T>(items: T[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentItems, setCurrentItems] = useState<T[]>([]);

  useEffect(() => {
    if (items) {
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setCurrentItems(items.slice(startIndex, endIndex));
    }
  }, [currentPage, items, itemsPerPage]);

  const totalPages = Math.ceil(items?.length / itemsPerPage);

  return {
    currentPage,
    setCurrentPage,
    currentItems,
    totalPages,
  };
};

export default usePagination;
