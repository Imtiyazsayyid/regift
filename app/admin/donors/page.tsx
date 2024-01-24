"use client";

import { Avatar, Button, Flex, Select, Table, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import AppTable from "../../components/Table";
import * as AdminServices from "../../Services/AdminServices";
import toast from "react-hot-toast";
import TableActions from "../../components/TableActions";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/Pagination";
import { Donor } from "../../interfaces/DonorInterface";
import SearchBar from "../../components/SearchBar";
import EntriesPerPage from "../../components/EntriesPerPage";
import { PlusIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";

const DonorsPage = () => {
  const tableTitles = ["#", "Profile", "Full Name", "Email", "Actions"];
  const [donors, setDonors] = useState<Donor[]>([]);
  const [entriesPerPage, setEntriesPerPage] = useState(7);
  const router = useRouter();
  const currentPath = usePathname();

  // loader
  const [isLoading, setLoading] = useState(true);

  // filters
  const [searchText, setSearchText] = useState("");

  const getAllDonors = async () => {
    setLoading(true);
    try {
      const res = await AdminServices.getAllDonors({ searchText });
      if (res.status) {
        setDonors(res.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed To Fetch Donors");
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllDonors();
  }, [searchText]);

  const {
    currentPage,
    currentItems: currentDonors,
    setCurrentPage,
    totalPages,
  } = usePagination(donors, entriesPerPage);

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
          placeholder="Find a donor"
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
        <AppTable titles={tableTitles} items={donors} isLoading={isLoading}>
          {currentDonors?.map((donor, index) => (
            <Table.Row align={"center"} key={index}>
              <Table.Cell>
                {index + 1 + currentPage * entriesPerPage}
              </Table.Cell>
              <Table.Cell>
                <Avatar
                  size={"2"}
                  radius="full"
                  fallback={"?"}
                  src={donor.profileImg || ""}
                />
              </Table.Cell>
              <Table.Cell>
                {donor.firstName} {donor.lastName}
              </Table.Cell>
              <Table.Cell>{donor.email}</Table.Cell>

              <Table.Cell>
                <TableActions
                  id={donor.id}
                  removedItem={`donor "${donor.firstName} ${donor.lastName}"`}
                  deleteFunction={() => AdminServices.deleteDonor(donor.id)}
                  fetchData={getAllDonors}
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

export default DonorsPage;
