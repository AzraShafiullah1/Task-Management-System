import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const { title, description, date, completed, important } = await req.json();

    if (!title || !description || !date) {
      return NextResponse.json({ error: "Missing required fields", status: 400 });
    }

    if (title.length < 3) {
      return NextResponse.json({ error: "Title must be at least 3 characters long", status: 400 });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json({ error: "Invalid date format", status: 400 });
    }

   const handleSubmit = async () => {
  const res = await fetch("/api/tasks", {
    method: "POST",
    body: JSON.stringify({
      title,
      description,
      date: new Date(date).toISOString(), // ✅ Make sure it's ISO string
      completed: completed,
      important: important,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (!res.ok) {
    console.error("Failed to create task:", data.error);
    return;
  }

  console.log("Task created:", data);
};
  

    return NextResponse.json('task');
  } catch (error) {
    console.log("ERROR CREATING TASK: ", error);
    return NextResponse.json({ error: "Error creating task", status: 500 });
  }
}




