import { CarouselConfig } from "../../types";
import { useState } from "react";
import React from "react";
import { Button } from "semantic-ui-react";
import { CarouselModalForm } from "../../components/CarouselModalForm";

type NewCarouselButtonProps = {
  onNewCarousel: (data: CarouselConfig) => void;
};

export const NewCarouselButton = ({ onNewCarousel }: NewCarouselButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <Button color="green" onClick={() => setOpen(true)}>
        New Carousel
      </Button>
      <CarouselModalForm
        onSubmit={onNewCarousel}
        open={open}
        setOpen={setOpen}
      />
    </React.Fragment>
  );
};
