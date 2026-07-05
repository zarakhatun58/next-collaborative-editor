import { NextRequest, NextResponse } from "next/server";

import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "@/src/services/document.service";
import {
  createDocumentSchema,
  updateDocumentSchema,
} from "@/src/validators/document.validation";
import { getCurrentUser } from "@/src/services/auth.service";


export async function create(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);

    console.log("User:", user);

    const body = await req.json();

    console.log("Body:", body);

    const data = createDocumentSchema.parse(body);

    console.log("Parsed:", data);

    const document = await createDocument(
      data.title,
      data.content ?? "",
      user.id
    );

    return NextResponse.json(
      {
        success: true,
        document,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to create document",
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

    const documents =
      await getDocuments(user.id);

    return NextResponse.json({
      success: true,
      documents,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to fetch documents",
      },
      {
        status: 400,
      }
    );
  }
}
export async function getOne(
  req: NextRequest,
  id: string
) {
  try {
    const user = await getCurrentUser(req);

    const document =
      await getDocumentById(
        id,
        user.id
      );

    return NextResponse.json({
      success: true,
      document,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Document not found",
      },
      {
        status: 404,
      }
    );
  }
}

export async function update(
  req: NextRequest,
  id: string
) {
  try {
    const user = await getCurrentUser(req);

    const body = await req.json();

    const data = updateDocumentSchema.parse(body);

    const document = await updateDocument(
      id,
      {
        title: data.title,
        content: data.content,
      },
      user.id
    );

    return NextResponse.json({
      success: true,
      document,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Update failed",
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

    await deleteDocument(
      id,
      user.id
    );

    return NextResponse.json({
      success: true,
      message:
        "Document deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Delete failed",
      },
      {
        status: 400,
      }
    );
  }
}