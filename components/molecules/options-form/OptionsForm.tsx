import { useState } from "react";
import { Control, FieldValues } from "react-hook-form";
import Button from "react-bootstrap/Button";

import { Input } from "@/components/atoms";

import styles from "./styles.module.scss";

type Props<TFields extends FieldValues> = { control: Control<TFields> };

export default function OptionsForm<TFields extends FieldValues>({
  control,
}: Props<TFields>) {
  const [options, setOptions] = useState<number[]>([]);

  const handleAddOption = () => {
    if (options.length === 0) {
      setOptions([1]);
      return;
    }
    setOptions((prev) => [...prev, prev[prev.length - 1] + 1]);
  };

  return (
    <div>
      <div className={styles.optionsHeader}>
        <h4>Дополнительные опции</h4>
        <Button variant="outline-primary" onClick={handleAddOption}>
          Добавить опцию
        </Button>
      </div>
      <div className={styles.optionsList}>
        {options.map((option: number) => (
          <Input
            control={control}
            name={`options.option${option}`}
            label={`Опция №${option}`}
            key={option}
          />
        ))}
      </div>
    </div>
  );
}
