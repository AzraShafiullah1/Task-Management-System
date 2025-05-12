// app/api/tasks/[id]/route.ts

import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    const { id } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const deletedTask = await prisma.task.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletedTask);
  } catch (error) {
    console.error("ERROR DELETING TASK:", error);
    return NextResponse.json({ error: "Error deleting task", status: 500 });
  }
}
