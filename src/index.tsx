import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import { SystemConfig, DiscreteSystem, TickResponse } from "./types";
import { ConfigScreen } from "./screens/ConfigScreen/ConfigScreen";
import { postAPI } from "./postAPI";
import { ViewScreen } from "./screens/ViewScreen/ViewScreen";
import useInterval from "./useInterval";

type State = {
  currentScreen: "config" | "view";
  config: SystemConfig | null;
  currentSystem: DiscreteSystem | null;
  responses: TickResponse[];
};

const DEFAULT_STATE: State = {
  currentScreen: "config",
  config: null,
  currentSystem: null,
  responses: []
};

type Action =
  | {
      type: "END_CONFIGURAITON";
      payload: { config: SystemConfig; system: DiscreteSystem };
    }
  | { type: "TICK_RESPONSE_RECEIVED"; payload: TickResponse };

const appReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "END_CONFIGURAITON":
      return {
        ...state,
        currentScreen: "view",
        currentSystem: action.payload.system,
        config: action.payload.config,
        responses: [{ system: action.payload.system, events: [] }]
      };

    case "TICK_RESPONSE_RECEIVED":
      return {
        ...state,
        currentSystem: action.payload.system,
        responses: [...state.responses, action.payload]
      };
  }

  return state;
};

const useAppReducer = () => {
  const [state, dispatch] = useReducer(appReducer, DEFAULT_STATE);

  const endConfiguration = (config: SystemConfig, system: DiscreteSystem) =>
    dispatch({ type: "END_CONFIGURAITON", payload: { config, system } });

  const tickResponseReceived = (response: TickResponse) =>
    dispatch({ type: "TICK_RESPONSE_RECEIVED", payload: response });

  return { state, actions: { endConfiguration, tickResponseReceived } };
};

const App = () => {
  const { state, actions } = useAppReducer();

  const onTick = async () => {
    if (
      state.currentSystem == null ||
      (state.currentSystem.events.length == 0 &&
        ((state.responses[state.responses.length - 1] || {}).events || [])
          .length == 0)
    )
      return;

    const response: TickResponse = await postAPI("/tick", state.currentSystem);

    console.group("tick");
    console.log("system pre", state.currentSystem);
    console.log("processed events", response.events);
    console.log("system post", response.system);
    console.groupEnd();

    actions.tickResponseReceived(response);
  };

  const { intervalId, start, stop } = useInterval(onTick, 200);

  if (state.currentScreen === "config") {
    return (
      <ConfigScreen
        onSubmit={async config => {
          console.log("bootstrapping config", config);

          const system = await postAPI("/bootstrap", config);

          actions.endConfiguration(config, system);
        }}
      />
    );
  }

  if (state.currentSystem == null || state.config == null) return <div />;

  return (
    <ViewScreen
      system={state.currentSystem}
      config={state.config}
      responses={state.responses}
      onTick={onTick}
      onAutoToggle={() => (intervalId == null ? start() : stop())}
      isAuto={intervalId != null}
    />
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
