import { NextRequest, NextResponse } from "next/server";
import {
  createConflict,
  getConflicts,
  resolveConflict,
  deleteConflict,
} from "@/src/services/conflict.service";
import { getCurrentUser } from "@/src/services/auth.service";
import {
  createConflictSchema,
  resolveConflictSchema,
} from "@/src/validators/conflict.validation";



export async function create(
  req: NextRequest
) {
  try {
    await getCurrentUser(req);

    const body = await req.json();

    const data = createConflictSchema.parse(body);

    const conflict = await createConflict(
      data.documentId,
      data.localContent,
      data.remoteContent
    );

    return NextResponse.json(
      {
        success: true,
        conflict,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to create conflict",
      },
      { status: 400 }
    );
  }
}

export async function getAll(
  req: NextRequest
) {
  try {
    const user = await getCurrentUser(req);
    const { searchParams } = new URL(req.url);
    const documentId = searchParams.get(
      "documentId"
    );

    if (!documentId) {
      throw new Error(
        "documentId is required"
      );
    }

    const conflicts =
      await getConflicts(
        documentId,
        user.id
      );

    return NextResponse.json({
      success: true,
      conflicts,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to fetch conflicts",
      },
      { status: 400 }
    );
  }
}

export async function resolve(
  req: NextRequest
) {
  try {
    const user = await getCurrentUser(req);
    const body = await req.json();
    const data =
      resolveConflictSchema.parse(body);

    const conflict =
      await resolveConflict(
        data.conflictId,
        user.id,
        data.content
      );

    return NextResponse.json({
      success: true,
      conflict,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to resolve conflict",
      },
      { status: 400 }
    );
  }
}

export async function remove(
  req: NextRequest
) {
  try {
    const { searchParams } = new URL(req.url);

    const conflictId =
      searchParams.get("id");

    if (!conflictId) {
      throw new Error(
        "Conflict id is required"
      );
    }

    await deleteConflict(conflictId);

    return NextResponse.json({
      success: true,
      message:
        "Conflict deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to delete conflict",
      },
      { status: 400 }
    );
  }
}