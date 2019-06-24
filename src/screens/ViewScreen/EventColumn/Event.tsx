import React from "react";

import {
  DiscreteSystemEvent,
  DiscreteSystem,
  CarouselComponent
} from "../../../types";
import { Label, Popup } from "semantic-ui-react";
import { CarouselCard } from "../../../components/CarouselCard";
import { CustomerCard } from "../../../components/CustomerCard";

type EventProps = { event: DiscreteSystemEvent; system: DiscreteSystem };

type ComponentLabelProps = { address: number; system: DiscreteSystem };

export const ComponentLabel = ({ address, system }: ComponentLabelProps) => {
  const carousels: CarouselComponent[] = Object.values(system.components)
    .filter(x => x.type === "Carousel")
    .map(x => x.data as any);

  const component = system.components[address];

  if (component == null) return <Label>Unknown {address}</Label>;
  else if (component.type === "CustomerDispatcher")
    return <Label>CustomerDispatcher</Label>;
  else {
    const content =
      component.type === "Carousel" ? (
        <CarouselCard value={component.data.config} />
      ) : (
        <CustomerCard
          value={component.data.config}
          carousels={carousels.map(carousel => carousel.config)}
        />
      );

    return (
      <Popup
        trigger={
          <Label>
            {component.type === "Carousel" ? "Carousel" : "Customer"}{" "}
            {component.data.config.id}
          </Label>
        }
      >
        {content}
      </Popup>
    );
  }

  return <div />;
};

export const Event = ({ event, system }: EventProps) => (
  <div style={{ borderBottom: "1px solid #ccc", display: "flex" }}>
    <div style={{ padding: 10, borderRight: "1px solid #ccc" }}>
      {event.time}
    </div>
    <div>
      <div style={{ padding: 10, fontWeight: "bold" }}>
        {event.message.type} - {event.message.data.type}
      </div>
      <div
        style={{ display: "flex", padding: 10, borderTop: "1px solid #ccc" }}
      >
        <div style={{ width: "50%" }}>
          From: <ComponentLabel address={event.from_address} system={system} />
        </div>
        <div style={{ width: "50%" }}>
          To: <ComponentLabel address={event.to_address} system={system} />
        </div>
      </div>
    </div>
  </div>
);
