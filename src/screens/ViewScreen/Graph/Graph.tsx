import React from "react";
import {
  CarouselComponent,
  DiscreteSystem,
  CustomerComponent
} from "../../../types";
import { positionCarousels } from "./positionCarousels";
import { positionCustomers } from "./positionCustomers";
import { CarouselCircle } from "./CarouselCircle";
import { CustomerCircle } from "./CustomerCircle";

type GraphProps = {
  width: number;
  height: number;
  system: DiscreteSystem;
};

export const Graph = ({ system, width, height }: GraphProps) => {
  const carousels: CarouselComponent[] = Object.values(system.components)
    .filter(x => x.type === "Carousel")
    .map(x => x.data as any);

  const customers: CustomerComponent[] = Object.values(system.components)
    .filter(x => x.type === "Customer")
    .map(x => x.data as any);

  const center = { x: width / 2, y: height / 2 };
  const maxCenterRadius = Math.min(width, height) / 2;
  const carouselRadius = 50;
  const customerRadius = 10;
  const customerGap = 5;

  const carouselsPositions = positionCarousels(
    carousels,
    center,
    maxCenterRadius - carouselRadius - customerRadius - customerGap,
    carouselRadius
  );

  const customersPositions = positionCustomers(
    customers,
    carouselsPositions,
    customerRadius,
    customerGap,
    { x: customerRadius + customerGap, y: customerRadius + customerGap }
  );

  return (
    <svg style={{ width: "100%", height: "100%" }}>
      {carouselsPositions.map(position => (
        <CarouselCircle
          carousel={position.item}
          center={position.center}
          radius={position.radius}
        />
      ))}
      {customersPositions.map(position => (
        <CustomerCircle
          customer={position.item}
          center={position.center}
          radius={position.radius}
          carousels={carousels}
          color={position.color}
        />
      ))}
    </svg>
  );
};
