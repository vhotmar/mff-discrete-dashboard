import React from "react";
import { CustomerConfig, CarouselConfig } from "../types";
import { Card, Label, Popup } from "semantic-ui-react";
import { CarouselCard } from "./CarouselCard";

type CustomerCardProps = {
  value: CustomerConfig;
  carousels: CarouselConfig[];
  extra?: React.ReactNode;
};

export const CustomerCard = ({
  value,
  carousels,
  extra
}: CustomerCardProps) => (
  <Card>
    <Card.Content>
      <Card.Header>Customer {value.id}</Card.Header>
      <Card.Meta>Arrives at {value.arrival_time}</Card.Meta>
      <Card.Description>
        Carousels to go:{" "}
        {value.carousels.map(carouselId => {
          const carouselConfig = carousels.find(
            carousel => carousel.id === carouselId
          );

          if (carouselConfig == null) return null;

          return (
            <Popup trigger={<Label>{carouselConfig.id}</Label>} hoverable>
              <CarouselCard value={carouselConfig} />
            </Popup>
          );
        })}
      </Card.Description>
    </Card.Content>
    {extra && <Card.Content extra>{extra}</Card.Content>}
  </Card>
);
