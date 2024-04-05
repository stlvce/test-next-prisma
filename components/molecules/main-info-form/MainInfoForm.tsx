import { Control, FieldValues } from "react-hook-form";
import Form from "react-bootstrap/Form";

import { Input } from "@/components/atoms";

type Props<TFields extends FieldValues> = {
  control: Control<TFields>;
  changeVisibleTechCharacteristics: () => void;
};

export default function MainInfoForm<TFields extends FieldValues>({
  control,
  changeVisibleTechCharacteristics,
}: Props<TFields>) {
  return (
    <div>
      <h4>Основные характеристики</h4>
      <Input
        control={control}
        required
        name="name"
        label="Название"
        placeholder="Введите название"
      />
      <Input
        control={control}
        required
        name="description"
        label="Описание"
        placeholder="Введите описание"
      />
      <Input
        control={control}
        required
        name="price"
        label="Цена"
        placeholder="Введите цену"
        type="number"
      />
      <Input
        control={control}
        name="images"
        label="Фото"
        placeholder="Введите фото"
        type="file"
        multiple
        accept="image/png, image/jpeg"
      />
      <Input
        control={control}
        required
        name="contacts"
        label="Контакты"
        placeholder="Введите любой контакт"
      />
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="Добавить технические характеристики"
          onChange={changeVisibleTechCharacteristics}
        />
      </Form.Group>
    </div>
  );
}
