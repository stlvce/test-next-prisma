import { Control, FieldValues } from "react-hook-form";

import { Input } from "@/components/atoms";

type Props<TFields extends FieldValues> = {
  control: Control<TFields>;
};

export default function AdditionalInfoForm<TFields extends FieldValues>({
  control,
}: Props<TFields>) {
  return (
    <div>
      <h4>Дополнительные характеристики</h4>
      <Input
        control={control}
        name="technical_characteristics.brand"
        required
        label="Марка"
        placeholder="Введите марку автомобиля"
      />
      <Input
        control={control}
        name="technical_characteristics.model"
        required
        label="Модель"
        placeholder="Введите модель автомобиля"
      />
      <Input
        control={control}
        name="technical_characteristics.productionYear"
        required
        label="Год выпуска"
        placeholder="Введите год выпуска"
        type="number"
      />
      <Input
        control={control}
        name="technical_characteristics.body"
        required
        label="Кузов"
        placeholder="Введите кузов"
      />
      <Input
        control={control}
        name="technical_characteristics.mileage"
        required
        label="Пробег"
        placeholder="Введите количество пробега"
        type="number"
      />
    </div>
  );
}
