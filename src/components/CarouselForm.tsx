import React, { useState } from "react";
import { DEFAULT_CAROUSEL_CONFIG, CarouselConfig } from "../types";
import { Form, Message, Button } from "semantic-ui-react";
import { NumberInput } from "./NumberInputs";

interface CarouselConfigErrors {
  min_capacity?: boolean;
  capacity?: boolean;
  run_time?: boolean;
  wait_time?: boolean;
  extend_time?: boolean;
}

type CarouselFormProps = {
  onSubmit: (config: CarouselConfig) => void;
  data?: CarouselConfig;
};

const validate = (data: CarouselConfig) => {
  const newErrors: CarouselConfigErrors = {};
  const newErrorsList = [];

  if (data.min_capacity <= 0) {
    newErrors.min_capacity = true;
    newErrorsList.push("Minimal Capacity has to be greater than zero");
  }

  if (data.min_capacity > data.capacity) {
    newErrors.min_capacity = true;
    newErrorsList.push("Minimal Capacity has to be less than or equal to capacity");
  }

  if (data.capacity <= 0) {
    newErrors.capacity = true;
    newErrorsList.push("Capacity has to be greater than zero");
  }

  if (data.run_time <= 0) {
    newErrors.run_time = true;
    newErrorsList.push("Run time has to be greater than zero");
  }

  if (data.wait_time <= 0) {
    newErrors.wait_time = true;
    newErrorsList.push("Wait time has to be greater than zero");
  }

  if (data.extend_time <= 0) {
    newErrors.extend_time = true;
    newErrorsList.push("Extend time has to be greater than zero");
  }

  if (newErrorsList.length > 0)
    return { errors: newErrors, errorsList: newErrorsList };

  return null;
};

export const CarouselForm = ({ onSubmit, data = DEFAULT_CAROUSEL_CONFIG }: CarouselFormProps) => {
  const [state, setState] = useState(data);
  const [{ errors, errorsList }, setErrors] = useState<{
    errors: CarouselConfigErrors;
    errorsList: string[];
  }>({ errors: {}, errorsList: [] });

  const onFormSubmit = () => {
    const validation = validate(state);

    if (validation != null) {
      setErrors(validation);

      return;
    }

    onSubmit(state);
  };

  return (
    <Form error={errorsList.length > 0} onSubmit={onFormSubmit}>
      <NumberInput
        label="Minimal Capacity"
        value={state.min_capacity}
        error={errors.min_capacity}
        onChange={value => setState({ ...state, min_capacity: value })}
      />
      <NumberInput
        label="Capacity"
        value={state.capacity}
        error={errors.capacity}
        onChange={value => setState({ ...state, capacity: value })}
      />
      <NumberInput
        label="Run Time"
        value={state.run_time}
        error={errors.run_time}
        onChange={value => setState({ ...state, run_time: value })}
      />
      <NumberInput
        label="Wait Time"
        value={state.wait_time}
        error={errors.wait_time}
        onChange={value => setState({ ...state, wait_time: value })}
      />
      <NumberInput
        label="Extend Time"
        value={state.extend_time}
        error={errors.extend_time}
        onChange={value => setState({ ...state, extend_time: value })}
      />
      {errorsList.length > 0 && (
        <Message error header="There were few errors" list={errorsList} />
      )}
      <Button>Submit</Button>
    </Form>
  );
};
