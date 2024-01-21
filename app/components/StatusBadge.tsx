import { Badge } from "@radix-ui/themes";
import React from "react";
import { ApprovalStatus } from "../interfaces/ApprovalStatusInterface";

interface Props {
  status: ApprovalStatus;
}

const StatusBadge = ({ status }: Props) => {
  return (
    <Badge color={status ? "green" : "crimson"}>
      {status ? "Active" : "Inactive"}
    </Badge>
  );
};

export default StatusBadge;
