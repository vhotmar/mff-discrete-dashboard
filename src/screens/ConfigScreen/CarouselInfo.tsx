import { CarouselConfig } from "../../types";
import React, { useState } from "react";
import { CarouselCard } from "../../components/CarouselCard";
import { Button } from "semantic-ui-react";
import { CarouselModalForm } from "../../components/CarouselModalForm";

type CarouselInfoProps = {
  value: CarouselConfig;
  onChange: (data: CarouselConfig) => void;
  onRemove: (id: number) => void;
};

export const CarouselInfo = ({ value, onChange, onRemove }: CarouselInfoProps) => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <CarouselCard
        value={value}
        extra={
          <Button.Group fluid>
            <Button onClick={() => setOpen(true)}>Change</Button>
            <Button color="red" onClick={() => onRemove(value.id)}>
              Remove
            </Button>
          </Button.Group>
        }
      />
      <CarouselModalForm
        onSubmit={onChange}
        data={value}
        open={open}
        setOpen={setOpen}
      />
    </React.Fragment>
  );
};
