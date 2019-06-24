import React from "react";
import { CarouselConfig } from "../types";
import { Modal } from "semantic-ui-react";
import { CarouselForm } from "./CarouselForm";

type CarouselModalProps = {
  onSubmit: (data: CarouselConfig) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: CarouselConfig;
};

export const CarouselModalForm = ({
  onSubmit,
  open,
  setOpen,
  data
}: CarouselModalProps) => (
  <Modal open={open} onClose={() => setOpen(false)}>
    <Modal.Content>
      {open && (
        <CarouselForm
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
