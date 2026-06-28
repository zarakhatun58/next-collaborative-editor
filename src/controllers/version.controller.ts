import { NextRequest, NextResponse } from "next/server";

import {
    createVersion,
    getVersions,
     getVersionById,
  restoreVersion,
  deleteVersion,
} from "@/src/services/version.service";

import { getCurrentUser } from "@/src/services/auth.service";

// ===============================
// Create Version
// ===============================

export async function create(
  req: NextRequest,
  documentId: string
) {
  try {
    const user = await getCurrentUser(req);

    const body = await req.json();

    const version = await createVersion(
      documentId,
      user.id,
      body.name,
      body.content
    );

    return NextResponse.json(
      {
        success: true,
        version,
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
            : "Unable to create version",
      },
      {
        status: 400,
      }
    );
  }
}

// ===============================
// Get Versions
// ===============================

export async function getAll(
  req: NextRequest,
  documentId: string
) {
  try {
    const user = await getCurrentUser(req);

    const versions = await getVersions(
      documentId,
      user.id
    );

    return NextResponse.json({
      success: true,
      versions,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to fetch versions",
      },
      {
        status: 400,
      }
    );
  }
}

// ===============================
// Restore Version
// ===============================

export async function restore(
    req: NextRequest,
    versionId: string
) {
    try {
        const user = await getCurrentUser(req);

        const document = await restoreVersion(
            versionId,
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
                        : "Unable to restore version",
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

    const version = await getVersionById(
      id,
      user.id
    );

    return NextResponse.json({
      success: true,
      version,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Version not found",
      },
      {
        status: 404,
      }
    );
  }
}
export async function remove(
  req: NextRequest,
  versionId: string
) {
  try {
    const user = await getCurrentUser(req);

    const result = await deleteVersion(
      versionId,
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
            : "Delete failed",
      },
      {
        status: 400,
      }
    );
  }
}