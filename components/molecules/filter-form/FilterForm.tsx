"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function FilterForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const mileageQuery = searchParams.get("mileage")?.split("-") ?? ["", ""];
  const priceQuery = searchParams.get("price")?.split("-") ?? ["", ""];

  const { register, handleSubmit } = useForm({
    defaultValues: {
      brand: searchParams.get("brand"),
      model: searchParams.get("model"),
      productionYear: searchParams.get("productionYear"),
      body: searchParams.get("body"),
      mileage: {
        start: mileageQuery[0],
        end: mileageQuery[1],
      },
      price: {
        start: priceQuery[0],
        end: priceQuery[1],
      },
    },
  });

  const onSubmit = ({ mileage, price, ...data }: any) => {
    const searchParams = new URLSearchParams();

    for (let [key, value] of Object.entries(data)) {
      if (value) {
        searchParams.set(key, value as string);
      }
    }

    if (price.start || price.end) {
      searchParams.set("price", `${price.start}-${price.end}`);
    }

    if (mileage.start || mileage.end) {
      searchParams.set("price", `${mileage.start}-${mileage.end}`);
    }

    router.push(`/search?${searchParams}`);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} style={{ padding: "20px" }}>
      <Form.Group className="mb-3">
        <Form.Label>Марка</Form.Label>
        <Form.Control
          type="text"
          placeholder="Марка автомобиля..."
          {...register("brand")}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Модель</Form.Label>
        <Form.Control
          type="text"
          placeholder="Модель автомобиля..."
          {...register("model")}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Год выпуска</Form.Label>
        <Form.Control
          type="number"
          placeholder="Год выпуска..."
          {...register("productionYear")}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Кузов</Form.Label>
        <Form.Control
          type="text"
          placeholder="Тип кузова..."
          {...register("body")}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Пробег</Form.Label>
        <Form.Group style={{ display: "flex", gap: 20 }}>
          <Form.Control
            type="number"
            placeholder="от..."
            {...register("mileage.start")}
          />
          <Form.Control
            type="number"
            placeholder="до..."
            {...register("mileage.end")}
          />
        </Form.Group>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Цена</Form.Label>
        <Form.Group style={{ display: "flex", gap: 20 }}>
          <Form.Control
            type="number"
            placeholder="от..."
            {...register("price.start")}
          />
          <Form.Control
            type="number"
            placeholder="до..."
            {...register("price.end")}
          />
        </Form.Group>
      </Form.Group>
      <Button variant="primary" type="submit">
        Найти
      </Button>
    </Form>
  );
}
