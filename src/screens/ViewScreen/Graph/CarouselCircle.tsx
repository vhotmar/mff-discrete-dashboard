import React from "react";
import { CarouselComponent } from "../../../types";
import colors from "nice-color-palettes";
import { Popup } from "semantic-ui-react";
import { CarouselCard } from "../../../components/CarouselCard";

const BASE_COLORS = colors[2];

type CarouselCircleProps = {
  carousel: CarouselComponent;
  center: { x: number; y: number };
  radius: number;
};

export const CarouselCircle = ({
  carousel,
  center,
  radius
}: CarouselCircleProps) => {
  return (
    <Popup
      basic
      trigger={
        <g>
          <circle
            cx={center.x}
            cy={center.y}
            r={radius}
            fill={BASE_COLORS[4]}
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
            {carousel.config.id}
          </text>
        </g>
      }
    >
      {carousel != null && <CarouselCard value={carousel.config} />}
    </Popup>
  );
};
