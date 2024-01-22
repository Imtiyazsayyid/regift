import {
  CheckCircledIcon,
  CrossCircledIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import { Badge, Flex } from "@radix-ui/themes";
import { getConditionByKey } from "../helpers/EnumValues";

interface Props {
  condition: "new" | "like_new" | "used_good" | "used_fair" | "used_poor";
}

const ApprovalStatusBadge = ({ condition }: Props) => {
  let color: "blue" | "green" | "red" | "orange" | "bronze";

  if (condition === "new") {
    color = "green";
  } else if (condition === "like_new") {
    color = "orange";
  } else if (condition === "used_good") {
    color = "blue";
  } else if (condition === "used_fair") {
    color = "bronze";
  } else {
    color = "red";
  }

  return (
    <Badge radius="full" color={color} className="h-6" variant="surface">
      <Flex gap={"1"} align={"center"}>
        {getConditionByKey(condition)}
      </Flex>
    </Badge>
  );
};

export default ApprovalStatusBadge;
