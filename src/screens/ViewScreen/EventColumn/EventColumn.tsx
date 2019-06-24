import React from "react";
import {
  DiscreteSystemEvent,
  DiscreteSystem,
  TickResponse
} from "../../../types";
import { Button } from "semantic-ui-react";
import { Title } from "./Title";
import { Event } from "./Event";

type EventsColumnProps = {
  time: number;
  processedEvents: DiscreteSystemEvent[];
  currentEvents: DiscreteSystemEvent[];
  onTick: () => void;
  onAutoToggle: () => void;
  isAuto: boolean;
  system: DiscreteSystem;
  responses: TickResponse[];
};

export const EventsColumn = ({
  time,
  processedEvents,
  currentEvents,
  onTick,
  onAutoToggle,
  isAuto,
  system
}: EventsColumnProps) => {
  return (
    <div>
      <div style={{ padding: 10 }}>
        <Button onClick={onTick} fluid color="green">
          Tick
        </Button>
      </div>
      <div style={{ padding: 10 }}>
        <Button onClick={onAutoToggle} fluid>
          {isAuto ? "Stop Auto" : "Start Auto"}
        </Button>
      </div>
      <Title>Current Time: {time}</Title>

      {processedEvents.length !== 0 && (
        <React.Fragment>
          <Title>Events processed</Title>
      
          <div>
            {processedEvents.map(event => (
              <Event event={event} system={system} />
            ))}
          </div>
        </React.Fragment>
      )}

      {currentEvents.length !== 0 && (
        <React.Fragment>
          <Title>Events to go</Title>

          <div>
            {currentEvents.map(event => (
              <Event event={event} system={system} />
            ))}
          </div>
        </React.Fragment>
      )}

      {currentEvents.length === 0 && (
        <React.Fragment>
          <Title>Stats</Title>
          {Object.values(system.components).map(component => {
            if (component.type === "Customer") {
              return (
                <div style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
                  <b>Customer {component.data.config.id}</b>
                  <br />
                  Waiting for {component.data.total_waiting_time} from{" "}
                  {component.data.total_time}
                </div>
              );
            } else if (component.type === "Carousel") {
              return (
                <div style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
                  <b>Carousel {component.data.config.id}</b>
                  <br />
                  Max queue length: {component.data.max_customers_queue_len} |
                  Avg. customers on ride {component.data.avg_customers_on_ride}{" "}
                  | Idle time {component.data.idle_time}
                </div>
              );
            }
          })}
        </React.Fragment>
      )}
    </div>
  );
};
