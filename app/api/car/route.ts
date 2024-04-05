import { NextResponse, NextRequest } from "next/server";

import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { technical_characteristics, ...carData } = await request.json();
  const car = await prisma.car.create({
    data: {
      ...carData,
      technical_characteristics: !!technical_characteristics
        ? {
            create: {
              ...technical_characteristics,
              productionYear: technical_characteristics?.productionYear
                ? Number(technical_characteristics?.productionYear)
                : undefined,
            },
          }
        : {
            create: {
              brand: "",
              model: "",
              productionYear: 0,
              body: "",
              mileage: 0,
            },
          },
    },
  });

  return NextResponse.json(car);
}

export async function GET({ nextUrl: { searchParams } }: NextRequest) {
  const price = searchParams
    .get("price")
    ?.split("-")
    .map((item) => (item === "" ? undefined : Number(item)));

  const mileage = searchParams
    .get("mileage")
    ?.split("-")
    .map((item) => (item === "" ? undefined : Number(item)));

  const cars = await prisma.car.findMany({
    where: {
      price: price
        ? {
            gte: price[0],
            lte: price[1],
          }
        : undefined,
      technical_characteristics: {
        model: searchParams.get("model") ?? undefined,
        brand: searchParams.get("brand") ?? undefined,
        productionYear: searchParams.get("productionYear")
          ? Number(searchParams.get("productionYear"))
          : undefined,
        body: searchParams.get("body") ?? undefined,
        mileage: mileage ? { gte: mileage[0], lte: mileage[1] } : undefined,
      },
    },
    include: {
      technical_characteristics: true,
    },
  });

  return NextResponse.json(cars);
}

export async function PUT(request: Request) {
  const { id, technical_characteristics, ...carData } = await request.json();

  const car = await prisma.car.findFirst({ where: { id: Number(id) } });

  if (!car) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 400 });
  }

  const updateCar = await prisma.car.update({
    where: { id: Number(id) },

    data: {
      ...carData,
      technical_characteristics:
        technical_characteristics &&
        !Object.values(technical_characteristics).every(
          (value) => value === null,
        )
          ? {
              update: {
                data: technical_characteristics,
              },
            }
          : undefined,
    },
  });

  return NextResponse.json(updateCar);
}
