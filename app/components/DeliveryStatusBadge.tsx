import { CheckCircledIcon, CrossCircledIcon, UpdateIcon } from "@radix-ui/react-icons";
import { Badge, Flex } from "@radix-ui/themes";
import { getConditionByKey } from "../helpers/EnumValues";

interface Props {
  status: "pending" | "processing" | "confirmed" | "shipped" | "delivered" | "cancelled";
}

const DeliveryStatusBadge = ({ status }: Props) => {
  let color: "blue" | "grass" | "red" | "orange" | "bronze" | "crimson";

  if (status === "pending") {
    color = "bronze";
  } else if (status === "processing") {
    color = "orange";
  } else if (status === "confirmed") {
    color = "blue";
  } else if (status === "shipped") {
    color = "crimson";
  } else if (status == "delivered") {
    color = "grass";
  } else {
    color = "red";
  }

  return (
    <Badge radius="full" color={color} className="h-6" variant="surface">
      <Flex gap={"1"} align={"center"}>
        {status.charAt(0).toUpperCase()}
        {status.substring(1)}
      </Flex>
    </Badge>
  );
};

export default DeliveryStatusBadge;
