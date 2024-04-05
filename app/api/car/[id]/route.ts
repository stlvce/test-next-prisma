import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function DELETE(request: Request, { params }) {
  const id = Number(params.id);
  const deletedCar = await prisma.car.delete({
    where: {
      id,
    },
  });

  return NextResponse.json(deletedCar);
}
