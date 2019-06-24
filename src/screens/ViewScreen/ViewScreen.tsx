import React from "react";
import { DiscreteSystem, SystemConfig, TickResponse } from "../../types";
import useWindowSize from "react-use-window-size";
import { SizeMe } from "react-sizeme";
import { Graph } from "./Graph/Graph";
import { EventsColumn } from "./EventColumn/EventColumn";

type ViewScreenProps = {
  system: DiscreteSystem;
  config: SystemConfig;
  responses: TickResponse[];
  onTick: () => void;
  onAutoToggle: () => void;
  isAuto: boolean;
};

export const ViewScreen = ({
  system,
  config,
  responses,
  onTick,
  onAutoToggle,
  isAuto
}: ViewScreenProps) => {
  const { width, height } = useWindowSize();

  const latestResponse =
    responses.length > 0
      ? responses[responses.length - 1]
      : { system, events: [] };

  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        gridTemplateAreas:
          '"main main main events" "main main main events" "main main main events"'
      }}
    >
      <div style={{ gridArea: "main", width: "80%" }}>
        <SizeMe monitorHeight monitorWidth>
          {({ size }) => (
            <div style={{ width: "100%", height: "100%" }}>
              <Graph
                system={system}
                width={size.width || 1}
                height={size.height || 1}
              />
            </div>
          )}
        </SizeMe>
      </div>
      <div
        style={{
          gridArea: "events",
          borderLeft: "1px solid #ccc",
          width: "20%"
        }}
      >
        <EventsColumn
          time={system.current_time}
          processedEvents={latestResponse.events}
          currentEvents={system.events}
          onTick={onTick}
          onAutoToggle={onAutoToggle}
          isAuto={isAuto}
          system={system}
          responses={responses}
        />
      </div>
    </div>
  );
};
