"use client";

import { useState } from "react";
import { useForm, Form, FormSubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Input, Button } from "@/components/atoms";
import MainInfoForm from "@/components/molecules/main-info-form";
import AdditionalInfoForm from "@/components/molecules/additional-info-form";
import OptionsForm from "@/components/molecules/options-form";
import CarForm from "@/components/organisms/car-form";
import { ICar } from "@/types";

export default function UpdatePage() {
  const router = useRouter();
  const { control, handleSubmit, getValues } = useForm<ICar>();
  const [isActiveForm, setIsActiveForm] = useState<boolean>(false);

  const onSubmit: FormSubmitHandler<ICar> = ({ data }) => {
    fetch("/api/car", {
      method: "PUT",
      body: JSON.stringify({
        ...data,
        price: Number(data.price),
        technical_characteristics: {
          ...data.technical_characteristics,
          mileage: Number(data.technical_characteristics?.mileage),
          productionYear: Number(
            data.technical_characteristics?.productionYear,
          ),
        },
      }),
    })
      .then((res) => res.json())
      .then(() => {
        router.refresh();
      });
  };

  return (
    <Form control={control} onSubmit={onSubmit}>
      <CarForm>
        <Input
          control={control}
          name="id"
          required
          label="ID"
          placeholder="ID автомобиля..."
          type="number"
        />
        <MainInfoForm
          control={control}
          changeVisibleTechCharacteristics={() =>
            setIsActiveForm(!isActiveForm)
          }
        />
        {isActiveForm ? <AdditionalInfoForm control={control} /> : null}
        <OptionsForm control={control} />
        <Button variant="primary" type="submit">
          Сохранить
        </Button>
      </CarForm>
    </Form>
  );
}
