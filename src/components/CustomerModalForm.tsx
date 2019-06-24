import React from "react";
import { CustomerConfig, CarouselConfig } from "../types";
import { Modal } from "semantic-ui-react";
import { CustomerForm } from "./CustomerForm";

type CustomerModalProps = {
  onSubmit: (data: CustomerConfig) => void;
  carousels: CarouselConfig[];
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: CustomerConfig;
};

export const CustomerModalForm = ({
  carousels,
  onSubmit,
  open,
  setOpen,
  data
}: CustomerModalProps) => (
  <Modal open={open} onClose={() => setOpen(false)}>
    <Modal.Content>
      {open && (
        <CustomerForm
          carousels={carousels}
          data={data}
          onSubmit={data => {
            onSubmit(data);

            setOpen(false);
          }}
        />
      )}
    </Modal.Content>
  </Modal>
);
