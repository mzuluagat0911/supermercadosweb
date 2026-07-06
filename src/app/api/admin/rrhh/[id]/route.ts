import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

const VALID_STATUSES = ["PENDING", "REVIEWED", "CONTACTED", "REJECTED"];

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const { status } = await request.json();

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Estado no válido." }, { status: 400 });
    }

    const application = await prisma.hrApplication.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(application);
  } catch {
    return NextResponse.json({ error: "Postulación no encontrada." }, { status: 404 });
  }
}
