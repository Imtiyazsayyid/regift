"use client";
import { Avatar, Button, Flex, Select, Table, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import AppTable from "../../components/Table";
import * as AdminServices from "../../Services/AdminServices";
import toast from "react-hot-toast";
import TableActions from "../../components/TableActions";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/Pagination";
import { Category } from "../../interfaces/CategoryInterface";
import SearchBar from "../../components/SearchBar";
import EntriesPerPage from "../../components/EntriesPerPage";
import { PlusIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";

const CategoriesPage = () => {
  const tableTitles = ["#", "Name", "Action"];
  const [categories, setCategories] = useState<Category[]>([]);
  const [entriesPerPage, setEntriesPerPage] = useState(7);
  const router = useRouter();
  const currentPath = usePathname();

  // loader
  const [isLoading, setLoading] = useState(true);

  // filters
  const [searchText, setSearchText] = useState("");

  const getAllCategories = async () => {
    setLoading(true);
    try {
      const res = await AdminServices.getAllCategories({ searchText });
      if (res.status) {
        setCategories(res.data.data);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed To Fetch Categories");
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllCategories();
  }, [searchText]);

  const {
    currentPage,
    currentItems: currentCategories,
    setCurrentPage,
    totalPages,
  } = usePagination(categories, entriesPerPage);

  return (
    <Flex className="w-full" direction={"column"} gap={"2"}>
      <Flex
        className="min-h-20 border rounded-lg shadow-sm"
        p={"4"}
        align={"center"}
        justify={"between"}
      >
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          placeholder="Find a Category"
        />
        <Flex align={"end"} gap={"2"}>
          <EntriesPerPage
            entriesPerPage={entriesPerPage}
            setEntriesPerPage={(val) => setEntriesPerPage(val)}
          />
          <Button
            variant="surface"
            onClick={() => router.push(currentPath + "/new")}
          >
            <PlusIcon /> Add New
          </Button>
        </Flex>
      </Flex>
      <Flex
        className="h-full w-full rounded-lg shadow-lg border overflow-hidden"
        direction={"column"}
        justify={"between"}
        p={"4"}
      >
        <AppTable titles={tableTitles} items={categories} isLoading={isLoading}>
          {currentCategories?.map((categories, index) => (
            <Table.Row align={"center"} key={index}>
              <Table.Cell>
                {index + 1 + currentPage * entriesPerPage}
              </Table.Cell>
              {/* <Table.Cell>
                <Avatar
                  size={"2"}
                  radius="full"
                  fallback={"?"}
                  src={categories.profileImg || ""}
                />
              </Table.Cell> */}
              <Table.Cell>
                {categories.name} 
              </Table.Cell>
              {/* <Table.Cell>{categories.key}</Table.Cell> */}

              <Table.Cell>
                <TableActions
                  id={categories.id}
                  removedItem={`category "${categories.name} "`}
                  deleteFunction={() => AdminServices.deleteCategory(categories.id)}
                  fetchData={getAllCategories}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </AppTable>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default CategoriesPage;
