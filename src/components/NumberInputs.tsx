import React from "react";
import { Form, Input } from "semantic-ui-react";

type NumberInputProps = {
  value: number;
  onChange: (value: number) => void;
  label: string;
  error?: boolean;
};

export const NumberInput = ({ value, onChange, label, error }: NumberInputProps) => {
  return (
    <Form.Field error={error}>
      <label>{label}</label>
      <Input
        type="number"
        value={value}
        onChange={ev => onChange(Number(ev.target.value))}
      />
    </Form.Field>
  );
};
