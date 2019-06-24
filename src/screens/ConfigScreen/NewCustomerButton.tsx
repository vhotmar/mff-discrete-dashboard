import { CustomerConfig, CarouselConfig } from "../../types";
import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { CustomerModalForm } from "../../components/CustomerModalForm";

type NewCustomerButtonProps = {
  onNewCustomer: (data: CustomerConfig) => void;
  carousels: CarouselConfig[];
};

export const NewCustomerButton = ({
  onNewCustomer,
  carousels
}: NewCustomerButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <Button color="green" onClick={() => setOpen(true)}>
        New Customer
      </Button>
      <CustomerModalForm
        carousels={carousels}
        onSubmit={onNewCustomer}
        open={open}
        setOpen={setOpen}
      />
    </React.Fragment>
  );
};
