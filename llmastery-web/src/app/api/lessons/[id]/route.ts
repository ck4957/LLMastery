import { NextRequest, NextResponse } from "next/server";
import { getLessonById, updateLesson, deleteLesson } from "@/services/lessons";

/**
 * GET /api/lessons/[id]
 * Fetches a single lesson by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: "Lesson ID is required" },
      { status: 400 }
    );
  }

  try {
    const lesson = await getLessonById(id);

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    return NextResponse.json({ data: lesson });
  } catch (error: any) {
    console.error(`Error in GET /api/lessons/${id}:`, error);
    return NextResponse.json(
      { error: error.message || "An error occurred while fetching the lesson" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/lessons/[id]
 * Updates a lesson by ID
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: "Lesson ID is required" },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();
    const updated = await updateLesson(id, body);

    if (!updated) {
      return NextResponse.json(
        { error: "Failed to update lesson" },
        { status: 400 }
      );
    }

    return NextResponse.json({ data: updated });
  } catch (error: any) {
    console.error(`Error in PATCH /api/lessons/${id}:`, error);
    return NextResponse.json(
      { error: error.message || "An error occurred while updating the lesson" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/lessons/[id]
 * Deletes a lesson by ID
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: "Lesson ID is required" },
      { status: 400 }
    );
  }

  try {
    const result = await deleteLesson(id);

    if (!result.success) {
      return NextResponse.json(
        { error: "Failed to delete lesson" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(`Error in DELETE /api/lessons/${id}:`, error);
    return NextResponse.json(
      { error: error.message || "An error occurred while deleting the lesson" },
      { status: 500 }
    );
  }
}
