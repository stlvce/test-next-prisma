"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import { Button, Input } from "@/components/atoms";
import { Stack } from "@/components/templates";
import { ICar } from "@/types";

type Props = {
  searchParams: {
    id?: string;
  };
};
type FormState = { id: string };
type InfoState = { car: ICar | null; isError: boolean; isLoading: boolean };

const infoInitialState = {
  car: null,
  isError: false,
  isLoading: false,
};

export const dynamic = "force-dynamic";

export default function DeletePage({ searchParams }: Props) {
  const router = useRouter();

  const { control, handleSubmit } = useForm<FormState>();
  const [info, setInfo] = useState<InfoState>(infoInitialState);

  const onSubmit = ({ id }: { id: string }) => {
    setInfo({ ...info, isLoading: true });
    fetch(`/api/car/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((car) => {
        setInfo({ isError: false, car, isLoading: false });
        router.refresh();
      })
      .catch(() => setInfo({ car: null, isError: true, isLoading: false }));
  };

  return (
    <Stack gap={3}>
      <Form className="p-2" onSubmit={handleSubmit(onSubmit)}>
        <Input
          control={control}
          name="id"
          label="ID"
          placeholder="ID автомобиля..."
          type="number"
        />
        <Button variant="danger" type="submit" disabled={info.isLoading}>
          {info.isLoading ? "Загрузка..." : "Удалить"}
        </Button>
      </Form>

      {info.isError ? (
        <Alert className="p-2" variant="danger">
          <Alert.Heading>Автомобиль с таким id ненайден</Alert.Heading>
        </Alert>
      ) : null}

      {info.car ? (
        <Alert variant="success">
          <Alert.Heading>
            Автомобиль с id {info.car.id} был удален
          </Alert.Heading>
        </Alert>
      ) : null}
    </Stack>
  );
}
