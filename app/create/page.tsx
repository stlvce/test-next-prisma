"use client";

import { useState } from "react";
import { FormSubmitHandler, useForm, Form } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/atoms";
import Alert from "@/components/molecules/alert";
import MainInfoForm from "@/components/molecules/main-info-form";
import AdditionalInfoForm from "@/components/molecules/additional-info-form";
import OptionsForm from "@/components/molecules/options-form";
import CarForm from "@/components/organisms/car-form";

import { ICar } from "@/types";

export default function CreatePage() {
  const router = useRouter();
  const { control } = useForm<ICar>();
  const [isActiveForm, setIsActiveForm] = useState<boolean>(false);
  const [statusReq, setStatusReq] = useState<number>();

  const onSubmit: FormSubmitHandler<ICar> = ({ data }) => {
    fetch("/api/car", {
      method: "POST",
      body: JSON.stringify({ ...data, price: Number(data.price) }),
    })
      .then((res) => res.json())
      .then((car) => {
        router.refresh();
        setStatusReq(200);
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        setStatusReq(500);
      });
  };

  return (
    <>
      {statusReq === 200 ? (
        <Alert variant="success" message="Автомобиль создан" />
      ) : null}
      {statusReq && statusReq !== 200 ? (
        <Alert variant="danger" message="Ошибка" />
      ) : null}

      <Form control={control} onSubmit={onSubmit}>
        <CarForm>
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
    </>
  );
}
