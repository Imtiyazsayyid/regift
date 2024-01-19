import React, { ReactNode } from "react";
import { Table } from "@radix-ui/themes";

interface Props {
  titles: string[];
  children: ReactNode;
}

const AppTable = ({ titles, children }: Props) => {
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
