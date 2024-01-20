"use client";

import { Avatar, Flex, Table } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import AppTable from "../components/Table";
import * as AdminServices from "../Services/AdminServices";
import toast from "react-hot-toast";
import TableActions from "../components/TableActions";
import usePagination from "../hooks/usePagination";
import Pagination from "../components/Pagination";
import { Donor } from "../interfaces/DonorInterface";

const DonorsPage = () => {
  const tableTitles = ["#", "Profile", "Full Name", "Email", "Actions"];
  const [donors, setDonors] = useState<Donor[]>([]);

  const getAllDonors = async () => {
    try {
      const res = await AdminServices.getAllDonors();
      if (res.status) {
        setDonors(res.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed To Fetch Donors");
    }
  };

  useEffect(() => {
    getAllDonors();
  }, []);

  const {
    currentPage,
    currentItems: currentDonors,
    setCurrentPage,
    totalPages,
  } = usePagination(donors, 8);

  return (
    <Flex className="w-full" direction={"column"} gap={"2"}>
      <Flex className="min-h-20 w-full border rounded-lg shadow-sm"></Flex>
      <Flex
        className="h-full w-full rounded-lg shadow-lg border overflow-hidden"
        direction={"column"}
        justify={"between"}
        p={"4"}
      >
        <AppTable titles={tableTitles}>
          {currentDonors?.map((donor, index) => (
            <Table.Row align={"center"} key={index}>
              <Table.Cell>{index + 1}</Table.Cell>
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
                  editLink={`/donor/edit/${donor.id}`}
                  viewLink={`/donor/view/${donor.id}`}
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
