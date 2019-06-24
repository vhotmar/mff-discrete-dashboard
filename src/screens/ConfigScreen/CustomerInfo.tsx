import { CustomerConfig, CarouselConfig } from "../../types";
import React, { useState } from "react";
import { CustomerCard } from "../../components/CustomerCard";
import { Button } from "semantic-ui-react";
import { CustomerModalForm } from "../../components/CustomerModalForm";

type CustomerInfoProps = {
  value: CustomerConfig;
  onChange: (data: CustomerConfig) => void;
  onRemove: (id: number) => void;
  carousels: CarouselConfig[];
};

export const CustomerInfo = ({
  value,
  carousels,
  onChange,
  onRemove
}: CustomerInfoProps) => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <CustomerCard
        value={value}
        carousels={carousels}
        extra={
          <Button.Group fluid>
            <Button onClick={() => setOpen(true)}>Change</Button>
            <Button color="red" onClick={() => onRemove(value.id)}>
              Remove
            </Button>
          </Button.Group>
        }
      />
      <CustomerModalForm
        onSubmit={onChange}
        data={value}
        carousels={carousels}
        open={open}
        setOpen={setOpen}
      />
    </React.Fragment>
  );
};
