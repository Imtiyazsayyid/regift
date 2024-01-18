"use client";
import DeleteConfirmation from "@/app/components/DeleteConfirmation";
import {
  ArrowRightIcon,
  EyeOpenIcon,
  Pencil2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import axios, { Axios, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import toast from "react-hot-toast";

interface Props {
  editLink?: string;
  viewLink?: string;
  deleteFunction?: () => Promise<AxiosResponse>;
  removedItem: string;
  editModal?: ReactNode;
  fetchData: () => {};
}

const TableActions = ({
  editLink,
  viewLink,
  deleteFunction,
  removedItem,
  fetchData,
  editModal,
}: Props) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      if (deleteFunction) {
        const res = await deleteFunction();
        if (!res.data.status) {
          toast.error(res.data.error);
        }
        toast.success("Deleted Successfully");

        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      gap={"2"}
      className="shadow-sm w-fit p-2 rounded-full border"
      justify={"center"}
    >
      {viewLink && (
        <Button
          variant="soft"
          color="blue"
          onClick={() => router.push(viewLink)}
          radius="full"
        >
          <EyeOpenIcon />
        </Button>
      )}
      {editLink && (
        <Button
          variant="soft"
          color="violet"
          onClick={() => router.push(editLink)}
          radius="full"
        >
          <Pencil2Icon />
        </Button>
      )}
      {editModal}
      {deleteFunction && (
        <DeleteConfirmation
          confirmDelete={handleDelete}
          removedItem={removedItem}
        />
      )}
    </Flex>
  );
};

export default TableActions;
