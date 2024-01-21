import {
  CheckCircledIcon,
  CrossCircledIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import { Badge, Flex } from "@radix-ui/themes";

interface Props {
  status: "pending" | "approved" | "rejected";
}

const ApprovalStatusBadge = ({ status }: Props) => {
  let color: "blue" | "green" | "red";
  let icon;

  if (status === "pending") {
    color = "blue";
    icon = <UpdateIcon className="h-4 w-4" />;
  } else if (status === "approved") {
    color = "green";
    icon = <CheckCircledIcon />;
  } else {
    color = "red";
    icon = <CrossCircledIcon />;
  }

  return (
    <Badge radius="full" color={color} className="h-6">
      <Flex gap={"1"} align={"center"}>
        {icon}
        {status[0].toUpperCase()}
        {status.substring(1)}
      </Flex>
    </Badge>
  );
};

export default ApprovalStatusBadge;
