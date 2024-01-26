"use client";

import { Avatar, Flex, Table } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as AdminServices from "../../Services/AdminServices";
import CategoryFilter from "../../components/CategoryFilter";
import ConditionBadge from "../../components/ConditionBadge";
import ConditionFilter from "../../components/ConditionFilter";
import EntriesPerPage from "../../components/EntriesPerPage";
import Pagination from "../../components/Pagination";
import SearchBar from "../../components/SearchBar";
import AppTable from "../../components/Table";
import TableActions from "../../components/TableActions";
import { getEmptyOrValue } from "../../helpers/selectHelpers";
import usePagination from "../../hooks/usePagination";
import { DonatedItem } from "../../interfaces/DonatedItemInterface";

const InventoryPage = () => {
  const tableTitles = [
    "#",
    "Image",
    "Title",
    "Category",
    "Condition",
    "Donated By",
    "Actions",
  ];
  const [inventory, setInventory] = useState<DonatedItem[]>([]);
  const [entriesPerPage, setEntriesPerPage] = useState(7);

  // loader
  const [isLoading, setLoading] = useState(true);

  // filters
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("all");
  const [condition, setCondition] = useState("all");

  const getInventory = async () => {
    setLoading(true);

    try {
      const res = await AdminServices.getAllDonatedItems({
        searchText,
        approvalStatus: "approved",
        categoryId: getEmptyOrValue(category),
        condition: getEmptyOrValue(condition),
        availability: true,
        isPickedUp: true,
      });
      if (res.status) {
        setInventory(res.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed To Fetch DonatedItems");
    }
    setLoading(false);
  };

  useEffect(() => {
    getInventory();
    setCurrentPage(0);
  }, [searchText, category, condition]);

  const {
    currentPage,
    currentItems: currentInventory,
    setCurrentPage,
    totalPages,
  } = usePagination(inventory, entriesPerPage);

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
          placeholder="Find Inventory items"
        />
        <Flex gap={"2"}>
          <ConditionFilter condition={condition} setCondition={setCondition} />
          <CategoryFilter category={category} setCategory={setCategory} />
          <EntriesPerPage
            entriesPerPage={entriesPerPage}
            setEntriesPerPage={setEntriesPerPage}
          />
        </Flex>
      </Flex>
      <Flex
        className="h-full w-full rounded-lg shadow-lg border overflow-hidden"
        direction={"column"}
        justify={"between"}
        p={"4"}
      >
        <AppTable
          titles={tableTitles}
          items={currentInventory}
          isLoading={isLoading}
        >
          {currentInventory?.map((inventoryItem, index) => (
            <Table.Row align={"center"} key={index}>
              <Table.Cell>
                {index + 1 + currentPage * entriesPerPage}
              </Table.Cell>
              <Table.Cell>
                <Avatar
                  size={"2"}
                  fallback={"?"}
                  src={inventoryItem.image || ""}
                />
              </Table.Cell>
              <Table.Cell>{inventoryItem.title}</Table.Cell>
              <Table.Cell>{inventoryItem.category.name}</Table.Cell>
              <Table.Cell>
                <ConditionBadge condition={inventoryItem.condition} />
              </Table.Cell>
              <Table.Cell>
                {inventoryItem.donor.firstName} {inventoryItem.donor.lastName}
              </Table.Cell>

              <Table.Cell>
                <TableActions
                  id={inventoryItem.id}
                  removedItem={`donatedItem "${inventoryItem.title}"`}
                  deleteFunction={() =>
                    AdminServices.deleteDonatedItem(inventoryItem.id)
                  }
                  fetchData={getInventory}
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

export default InventoryPage;
