import React, { useState } from "react";
import {
  CustomerConfig,
  DEFAULT_CUSTOMER_CONFIG,
  CarouselConfig
} from "../types";
import {
  Form,
  Message,
  Button,
  Dropdown,
  Popup,
  Label,
  Icon
} from "semantic-ui-react";
import { NumberInput } from "./NumberInputs";
import { CarouselCard } from "./CarouselCard";

interface CusotmerConfigErrors {
  arrival_time?: boolean;
}

type CustomerFormProps = {
  onSubmit: (config: CustomerConfig) => void;
  carousels: CarouselConfig[];
  data?: CustomerConfig;
};

const validate = (data: CustomerConfig) => {
  const newErrors: CusotmerConfigErrors = {};
  const newErrorsList = [];

  if (data.arrival_time < 0) {
    newErrors.arrival_time = true;
    newErrorsList.push("Arrival time has to be greater than or equal to zero");
  }

  if (newErrorsList.length > 0)
    return { errors: newErrors, errorsList: newErrorsList };

  return null;
};

export const CustomerForm = ({
  onSubmit,
  carousels,
  data = DEFAULT_CUSTOMER_CONFIG
}: CustomerFormProps) => {
  const [state, setState] = useState(data);
  const [{ errors, errorsList }, setErrors] = useState<{
    errors: CusotmerConfigErrors;
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
        label="Arrival Time"
        value={state.arrival_time}
        error={errors.arrival_time}
        onChange={value => setState({ ...state, arrival_time: value })}
      />
      <Form.Field>
        <div>
          {state.carousels.map((carouselId, i) => {
            const carouselConfig = carousels.find(
              carousel => carousel.id === carouselId
            );

            if (carouselConfig == null) return null;

            return (
              <Popup
                trigger={
                  <Label>
                    {carouselConfig.id}
                    <Icon
                      name="delete"
                      onClick={() =>
                        setState({
                          ...state,
                          carousels: state.carousels.filter((_, ix) => ix !== i)
                        })
                      }
                    />
                  </Label>
                }
                hoverable
              >
                <CarouselCard value={carouselConfig} />
              </Popup>
            );
          })}
        </div>
        <Dropdown
          button
          text="Add Carousel"
          className="icon"
          icon="dropdown"
          onChange={(_, data) => {
            if (carousels.find(carousel => carousel.id === Number(data.value)) == null)
              return;

            setState({
              ...state,
              carousels: [...state.carousels, Number(data.value)]
            });
          }}
          options={carousels.map(carousel => ({
            key: carousel.id,
            text: carousel.id,
            value: carousel.id
          }))}
        />
      </Form.Field>
      {errorsList.length > 0 && (
        <Message error header="There were few errors" list={errorsList} />
      )}
      <Button>Submit</Button>
    </Form>
  );
};
