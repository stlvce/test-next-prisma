import CarCard from "@/components/molecules/car-card";
import { Stack } from "@/components/templates";
import { ICar } from "@/types";

export const dynamic = "force-dynamic";

async function getData(): Promise<ICar[]> {
  const res = await fetch("http://localhost:3000/api/car", {
    next: { tags: ["cars"] },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function ViewPage() {
  const cars: ICar[] = await getData();

  if (cars.length === 0) {
    return (
      <div style={{ textAlign: "center", opacity: 0.7 }}>
        Автомобили не добавлены
      </div>
    );
  }

  return (
    <Stack>
      {cars.map((car: ICar) => (
        <div className="p-3" key={car.id}>
          <CarCard {...car} />
        </div>
      ))}
    </Stack>
  );
}
