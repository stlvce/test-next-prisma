import FilterForm from "@/components/molecules/filter-form";
import CarCard from "@/components/molecules/car-card";
import { ContainerWithFilters } from "@/components/templates";
import { ICar } from "@/types";

export const dynamic = "force-dynamic";

type SearchParams = Record<string, string> | undefined;

async function getData(searchParams: SearchParams) {
  const queryString = new URLSearchParams(searchParams).toString();

  const res = await fetch(`http://localhost:3000/api/car?${queryString}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

type Props = {
  searchParams: SearchParams;
};

export default async function SearchPage({ searchParams }: Props) {
  const cars: ICar[] = await getData(searchParams);

  return (
    <ContainerWithFilters filterComponent={<FilterForm />}>
      {cars.map((car: ICar) => (
        <CarCard {...car} key={car.id} />
      ))}
    </ContainerWithFilters>
  );
}
