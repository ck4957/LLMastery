import { NextRequest, NextResponse } from "next/server";
import { getLessons } from "@/services/lessons";

/**
 * GET /api/lessons
 * Fetches lessons with optional filtering and pagination
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  try {
    const params = {
      limit: searchParams.has("limit") ? Number(searchParams.get("limit")) : 10,
      page: searchParams.has("page") ? Number(searchParams.get("page")) : 1,
      level: searchParams.get("level") || undefined,
      category: searchParams.get("category") || undefined,
      isPublished: searchParams.has("isPublished")
        ? searchParams.get("isPublished") === "true"
        : true,
      orderBy: searchParams.get("orderBy") || "order_index",
      ascending: searchParams.has("ascending")
        ? searchParams.get("ascending") === "true"
        : true,
    };

    const { lessons, count } = await getLessons(params);

    return NextResponse.json({
      data: lessons,
      meta: {
        total: count,
        page: params.page,
        limit: params.limit,
        pageCount: Math.ceil(count / params.limit),
      },
    });
  } catch (error: any) {
    console.error("Error in GET /api/lessons:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred while fetching lessons" },
      { status: 500 }
    );
  }
}
