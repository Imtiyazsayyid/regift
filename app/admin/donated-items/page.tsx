"use client";

import { Avatar, Flex, Select, Switch, Table, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import AppTable from "../../components/Table";
import * as AdminServices from "../../Services/AdminServices";
import toast from "react-hot-toast";
import TableActions from "../../components/TableActions";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/Pagination";
import { DonatedItem } from "../../interfaces/DonatedItemInterface";
import SearchBar from "../../components/SearchBar";
import EntriesPerPage from "../../components/EntriesPerPage";
import ApprovalStatusBadge from "../../components/ApprovalStatusBadge";
import ApprovalStatusFilter from "../../components/ApprovalStatusFilter";
import CategoryFilter from "../../components/CategoryFilter";
import {
  getEmptyOrValue,
  getEmptyOrValueForAvailability,
} from "../../helpers/selectHelpers";
import { getConditionByKey } from "../../helpers/EnumValues";
import ConditionBadge from "../../components/ConditionBadge";
import ConditionFilter from "../../components/ConditionFilter";
import AvailablityFilter from "../../components/AvailablityFilter";

const DonatedItemsPage = () => {
  const tableTitles = [
    "#",
    "Image",
    "Title",
    "Category",
    "Condition",
    "Donated By",
    "Approval Status",
    "Actions",
  ];
  const [donatedItems, setDonatedItems] = useState<DonatedItem[]>([]);
  const [entriesPerPage, setEntriesPerPage] = useState(7);

  // loader
  const [isLoading, setLoading] = useState(true);

  // filters
  const [searchText, setSearchText] = useState("");
  const [approvalStatus, setApprovalStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [condition, setCondition] = useState("all");
  const [availability, setAvailability] = useState("available");

  const getAllDonatedItems = async () => {
    setLoading(true);

    try {
      const res = await AdminServices.getAllDonatedItems({
        searchText,
        approvalStatus: getEmptyOrValue(approvalStatus),
        categoryId: getEmptyOrValue(category),
        condition: getEmptyOrValue(condition),
        availability: getEmptyOrValueForAvailability(availability),
      });
      if (res.status) {
        setDonatedItems(res.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed To Fetch DonatedItems");
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllDonatedItems();
    setCurrentPage(0);
  }, [searchText, approvalStatus, category, condition, availability]);

  const {
    currentPage,
    currentItems: currentDonatedItems,
    setCurrentPage,
    totalPages,
  } = usePagination(donatedItems, entriesPerPage);

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
          placeholder="Find donated items"
        />
        <Flex gap={"2"}>
          <AvailablityFilter
            setAvailability={setAvailability}
            availability={availability}
          />
          <ConditionFilter condition={condition} setCondition={setCondition} />
          <CategoryFilter category={category} setCategory={setCategory} />
          <ApprovalStatusFilter
            approvalStatus={approvalStatus}
            setApprovalStatus={setApprovalStatus}
          />
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
          items={currentDonatedItems}
          isLoading={isLoading}
        >
          {currentDonatedItems?.map((donatedItem, index) => (
            <Table.Row align={"center"} key={index}>
              <Table.Cell>
                {index + 1 + currentPage * entriesPerPage}
              </Table.Cell>
              <Table.Cell>
                <Avatar
                  size={"2"}
                  fallback={"?"}
                  src={donatedItem.image || ""}
                />
              </Table.Cell>
              <Table.Cell>{donatedItem.title}</Table.Cell>
              <Table.Cell>{donatedItem.category.name}</Table.Cell>
              <Table.Cell>
                <ConditionBadge condition={donatedItem.condition} />
              </Table.Cell>
              <Table.Cell>
                {donatedItem.donor.firstName} {donatedItem.donor.lastName}
              </Table.Cell>
              <Table.Cell>
                <ApprovalStatusBadge status={donatedItem.approvalStatus} />
              </Table.Cell>

              <Table.Cell>
                <TableActions
                  id={donatedItem.id}
                  removedItem={`donatedItem "${donatedItem.title}"`}
                  deleteFunction={() =>
                    AdminServices.deleteDonatedItem(donatedItem.id)
                  }
                  fetchData={getAllDonatedItems}
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

export default DonatedItemsPage;
