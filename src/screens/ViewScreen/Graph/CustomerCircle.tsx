import React from "react";
import { CustomerComponent, CarouselComponent } from "../../../types";
import { Popup } from "semantic-ui-react";
import { CustomerCard } from "../../../components/CustomerCard";

type CustomerCircleProps = {
  customer: CustomerComponent;
  carousels: CarouselComponent[];
  center: { x: number; y: number };
  radius: number;
  color: string;
};

export const CustomerCircle = ({
  customer,
  carousels,
  center,
  radius,
  color,
}: CustomerCircleProps) => {
  return (
    <Popup
      basic
      trigger={
        <g>
          <circle
            cx={center.x}
            cy={center.y}
            r={radius}
            fill={color}
            style={{ transition: "1s all" }}
          />

          <text
            dy="0.35em"
            fill="#fff"
            x={center.x}
            y={center.y}
            text-anchor="middle"
            style={{ transition: "1s all" }}
          >
            {customer.config.id}
          </text>
        </g>
      }
    >
      {customer != null && (
        <CustomerCard
          value={customer.config}
          carousels={carousels.map(carousel => carousel.config)}
        />
      )}
    </Popup>
  );
};
