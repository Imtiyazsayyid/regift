import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React from "react";

interface Props {
  confirmDelete: () => void;
}

const DeleteConfirmation = ({ confirmDelete }: Props) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" variant="soft" radius="full">
          <TrashIcon />
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Delete Item.</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure you want to remove this item? <br />
          This action cannot be reversed.
        </AlertDialog.Description>

        <Flex gap="3" mt="8" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red" onClick={confirmDelete}>
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteConfirmation;
