import { NextRequest, NextResponse } from "next/server";
import {
  createCommentSchema,
} from "@/src/validators/comment.validation";
import { getCurrentUser } from "@/src/services/auth.service";

import {
  createComment,
  getComments,
  deleteComment,
} from "@/src/services/comment.service";

export async function create(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);

    const body = await req.json();

const data =createCommentSchema.parse(body);

const comment = await createComment(
  data.documentId,
  user.id,
  data.message
);

    return NextResponse.json(
      {
        success: true,
        comment,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to create comment",
      },
      {
        status: 400,
      }
    );
  }
}

export async function getAll(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);

    const documentId =
      req.nextUrl.searchParams.get("documentId");

    if (!documentId) {
      throw new Error("documentId is required");
    }

    const comments = await getComments(
      documentId,
      user.id
    );

    return NextResponse.json({
      success: true,
      comments,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to fetch comments",
      },
      {
        status: 400,
      }
    );
  }
}

export async function remove(
  req: NextRequest,
  id: string
) {
  try {
    const user = await getCurrentUser(req);

    const result = await deleteComment(
      id,
      user.id
    );

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to delete comment",
      },
      {
        status: 400,
      }
    );
  }
}