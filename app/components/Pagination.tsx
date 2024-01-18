import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { Dispatch, SetStateAction } from "react";

interface Props {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
}

import React from "react";

const Pagination = ({ currentPage, setCurrentPage, totalPages }: Props) => {
  return (
    <Flex className="w-full p-2" justify={"center"}>
      <Flex
        justify={"between"}
        align={"center"}
        gap={"3"}
        className="border shadow-sm bg-white p-2 rounded-full w-96"
      >
        <Flex className="w-1/4">
          {currentPage > 0 && (
            <Button
              variant="soft"
              radius="full"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <ArrowLeftIcon />
            </Button>
          )}
        </Flex>
        <Text className="text-xs text-slate-500 w-1/2 text-center py-2">
          Showing {currentPage + 1} of {totalPages}
        </Text>
        <Flex className="w-1/4" justify={"end"}>
          {currentPage < totalPages - 1 && (
            <Button
              variant="soft"
              radius="full"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <ArrowRightIcon />
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Pagination;
