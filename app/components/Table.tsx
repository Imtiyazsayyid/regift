import React, { ReactNode } from "react";
import { Table, Flex, Text } from "@radix-ui/themes";

interface Props {
  titles: string[];
  children: ReactNode;
  items: any[];
}

const AppTable = ({ titles, children, items }: Props) => {
  if (items.length === 0)
    return (
      <Flex className="w-full py-20" justify={"center"}>
        <Text className="text-sm text-slate-500">No Items Found.</Text>
      </Flex>
    );

  return (
    <Table.Root
      variant="surface"
      className="w-full max-h-[98%] overflow-hidden"
    >
      <Table.Header>
        <Table.Row>
          {titles.map((title) => (
            <Table.ColumnHeaderCell key={title}>{title}</Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>{children}</Table.Body>
    </Table.Root>
  );
};

export default AppTable;
