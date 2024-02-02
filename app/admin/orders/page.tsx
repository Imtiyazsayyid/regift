"use client";

import { Avatar, Flex, Select, Switch, Table, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import AppTable from "../../components/Table";
import * as AdminServices from "../../Services/AdminServices";
import toast from "react-hot-toast";
import TableActions from "../../components/TableActions";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/Pagination";
import { Order } from "../../interfaces/OrderInterface";
import SearchBar from "../../components/SearchBar";
import EntriesPerPage from "../../components/EntriesPerPage";
import ApprovalStatusBadge from "../../components/ApprovalStatusBadge";
import ApprovalStatusFilter from "../../components/ApprovalStatusFilter";
import CategoryFilter from "../../components/CategoryFilter";
import { getEmptyOrValue, getEmptyOrValueForAvailability } from "../../helpers/selectHelpers";
import { getConditionByKey } from "../../helpers/EnumValues";
import ConditionBadge from "../../components/ConditionBadge";
import ConditionFilter from "../../components/ConditionFilter";
import AvailablityFilter from "../../components/AvailablityFilter";
import moment from "moment";
import DeliveryStatusBadge from "@/app/components/DeliveryStatusBadge";
import OrderStatusFilter from "@/app/components/OrderStatusFilter";
import { DateRangePicker } from "rsuite";

const OrdersPage = () => {
  const tableTitles = [
    "#",
    "Order ID",
    "Image",
    "Donated Item",
    "Organisation Name",
    "Order Date",
    "Order Status",
    "Actions",
  ];
  const [orders, setOrders] = useState<Order[]>([]);
  const [entriesPerPage, setEntriesPerPage] = useState(7);

  // loader
  const [isLoading, setLoading] = useState(true);

  // filters
  const [searchText, setSearchText] = useState("");
  const [orderStatus, setOrderStatus] = useState("all");
  const [showCancelled, setShowCancelled] = useState(false);
  const [dateRange, setDateRange] = useState([] as Date[] | null | "");

  const getAllOrders = async () => {
    setLoading(true);

    try {
      const res = await AdminServices.getAllOrders({
        searchText,
        orderStatus: getEmptyOrValue(orderStatus),
        showCancelled,
        dateRange,
      });
      if (res.status) {
        setOrders(res.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed To Fetch Orders");
    }
    setLoading(false);
  };

  const updateOrderStatus = async (orderId: number, orderStatus: string) => {
    setLoading(true);
    const res = await AdminServices.saveOrder({
      id: orderId,
      orderStatus,
    });

    if (!res.status) {
      toast.error("Status Could Not Be Updated");
      return;
    }

    toast.success("Order Status Updated");
    getAllOrders();
  };

  const customRenderValue = (value: Date[], formatString: string) => {
    if (value && value.length === 2) {
      return `${moment(value[0]).format("DD MMM, YYYY")} to ${moment(value[1]).format("DD MMM, YYYY")}`;
    }
    return "";
  };

  useEffect(() => {
    getAllOrders();
    setCurrentPage(0);
  }, [searchText, orderStatus, showCancelled, dateRange]);

  const {
    currentPage,
    currentItems: currentOrders,
    setCurrentPage,
    totalPages,
  } = usePagination(orders, entriesPerPage);

  return (
    <Flex className="w-full" direction={"column"} gap={"2"}>
      <Flex className="min-h-20 border rounded-lg shadow-sm" p={"4"} align={"center"} justify={"between"} gap={"2"}>
        <SearchBar searchText={searchText} setSearchText={setSearchText} placeholder="Find donated items" />

        <Flex gap={"3"} className="w-1/2 px-2" align={"end"} justify={"end"}>
          <DateRangePicker
            value={dateRange as [Date, Date]}
            size="sm"
            character=" to "
            format="dd MMM, yyyy"
            onChange={(val) => setDateRange(val || "")}
            placeholder="Select Date Range"
            className="w-[300px]"
            renderValue={customRenderValue}
            showOneCalendar
          />
          {!showCancelled && (
            <Flex className="w-[500px] h-fit mt-0">
              <OrderStatusFilter setOrderStatus={setOrderStatus} orderStatus={orderStatus} />
            </Flex>
          )}
          <Flex className="w-fit h-full mb-2 text-nowrap" justify="end" align={"end"} gap={"2"}>
            <Switch checked={showCancelled} onCheckedChange={(val) => setShowCancelled(val)} /> Show Cancelled
          </Flex>
        </Flex>
      </Flex>
      <Flex
        className="h-full w-full rounded-lg shadow-lg border overflow-hidden"
        direction={"column"}
        justify={"between"}
        p={"4"}
      >
        <AppTable
          titles={showCancelled ? tableTitles.filter((title) => title != "Order Status") : tableTitles}
          items={currentOrders}
          isLoading={isLoading}
        >
          {currentOrders?.map((order, index) => (
            <Table.Row align={"center"} key={index}>
              <Table.Cell>{index + 1 + currentPage * entriesPerPage}</Table.Cell>
              <Table.Cell>#{order.id}</Table.Cell>
              <Table.Cell>
                <Avatar size={"2"} fallback={"?"} src={order.donatedItem.image || ""} />
              </Table.Cell>

              <Table.Cell>
                #{order.donatedItemId} - {order.donatedItem.title}
              </Table.Cell>
              <Table.Cell>
                #{order.organisationId} - {order.organisation.name}
              </Table.Cell>

              <Table.Cell>{moment(order.created_at).format("DD MMM, YYYY")}</Table.Cell>
              {!showCancelled && (
                <Table.Cell>
                  <Select.Root value={order.orderStatus} onValueChange={(val) => updateOrderStatus(order.id, val)}>
                    <Select.Trigger className="w-40" variant="ghost" />
                    <Select.Content position="popper">
                      <Select.Item value="pending">
                        <DeliveryStatusBadge status="pending" />
                      </Select.Item>
                      <Select.Item value="processing">
                        <DeliveryStatusBadge status="processing" />
                      </Select.Item>
                      <Select.Item value="confirmed">
                        <DeliveryStatusBadge status="confirmed" />
                      </Select.Item>
                      <Select.Item value="shipped">
                        <DeliveryStatusBadge status="shipped" />
                      </Select.Item>
                      <Select.Item value="delivered">
                        <DeliveryStatusBadge status="delivered" />
                      </Select.Item>
                    </Select.Content>
                  </Select.Root>
                </Table.Cell>
              )}

              <Table.Cell>
                <TableActions
                  id={order.id}
                  deleteConfirmationTitle="Confirm Order Cancellation."
                  hideEdit
                  hideDelete={showCancelled}
                  deleteConfirmationDescription={`Are you sure you want to cancel order "${order.id}"?`}
                  removedItem={`order "${order.id}"`}
                  deleteFunction={() => AdminServices.deleteOrder(order.id)}
                  fetchData={getAllOrders}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </AppTable>
        {totalPages > 1 && (
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        )}
      </Flex>
    </Flex>
  );
};

export default OrdersPage;
