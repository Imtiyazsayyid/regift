import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React from "react";

interface Props {
  confirmDelete: () => void;
  removedItem: string;
  title?: string;
  desc?: string;
}

const DeleteConfirmation = ({ confirmDelete, removedItem, title, desc }: Props) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="ruby" variant="soft" radius="full">
          <TrashIcon />
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>{title || "Confirm Delete."}</AlertDialog.Title>
        {desc ? (
          <AlertDialog.Description size="2">{desc}</AlertDialog.Description>
        ) : (
          <AlertDialog.Description size="2">
            Are you sure you want to remove {removedItem}? <br />
            This action cannot be reversed.
          </AlertDialog.Description>
        )}

        <Flex gap="3" mt="8" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="ruby" onClick={confirmDelete}>
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteConfirmation;
