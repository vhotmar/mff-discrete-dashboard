import React from "react";
import { CarouselConfig } from "../types";
import { Card } from "semantic-ui-react";

type CarouselCardProps = { value: CarouselConfig; extra?: React.ReactNode };

export const CarouselCard = ({ value, extra }: CarouselCardProps) => (
  <Card>
    <Card.Content>
      <Card.Header>Carousel {value.id}</Card.Header>
      <Card.Meta>
        Cap. {value.capacity} | Min Cap. {value.min_capacity} | Run Time{" "}
        {value.run_time} | Wait Time {value.wait_time} | Ext. Wait Time{" "}
        {value.extend_time}
      </Card.Meta>
    </Card.Content>
    {extra && <Card.Content extra>{extra}</Card.Content>}
  </Card>
);
