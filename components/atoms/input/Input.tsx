import { Control, Controller, FieldValues, Path } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { FormControlProps } from "react-bootstrap";

type Props<T extends FieldValues = FieldValues> = FormControlProps & {
  control: Control<T>;
  name: string;
  label: string;
  required?: boolean;
};

export default function Input<T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  required = false,
  ...props
}: Props<T>) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Controller
        control={control}
        name={name as Path<T>}
        rules={{ required }}
        render={({ field: { onChange, value, ref } }) => (
          <Form.Control
            onChange={onChange}
            value={value}
            {...props}
            ref={ref}
          />
        )}
      />
    </Form.Group>
  );
}
