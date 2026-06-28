import { NextRequest, NextResponse } from "next/server";
import { Prisma, SyncOperationType } from "@prisma/client";

import {
  createSyncOperation,
  getPendingOperations,
  processQueue,
  createConflict,
  getConflicts,
  resolveConflict,
} from "@/src/services/sync.service";

import { getCurrentUser } from "@/src/services/auth.service";

// =====================================
// Create Sync Operation
// POST /api/sync
// =====================================

export async function create(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);

    const body = await req.json();

    const operation = await createSyncOperation(
      body.documentId,
      user.id,
      body.operationType as SyncOperationType,
      body.payload as Prisma.InputJsonValue,
      new Date(body.clientTimestamp)
    );

    return NextResponse.json(
      {
        success: true,
        operation,
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
            : "Unable to create sync operation",
      },
      {
        status: 400,
      }
    );
  }
}

// =====================================
// Get Pending Queue
// GET /api/sync/queue
// =====================================

export async function queue(
  req: NextRequest
) {
  try {
    const user = await getCurrentUser(req);

    const documentId =
      req.nextUrl.searchParams.get("documentId");

    if (!documentId) {
      throw new Error("Document ID is required");
    }

    const operations =
      await getPendingOperations(
        documentId,
        user.id
      );

    return NextResponse.json({
      success: true,
      operations,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to fetch queue",
      },
      {
        status: 400,
      }
    );
  }
}

// =====================================
// Process Queue
// POST /api/sync/process
// =====================================

export async function process(
  req: NextRequest
) {
  try {
    const user = await getCurrentUser(req);

    const body = await req.json();

    const result = await processQueue(
      body.documentId,
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
            : "Queue processing failed",
      },
      {
        status: 400,
      }
    );
  }
}

// =====================================
// Create Conflict
// POST /api/sync/conflict
// =====================================

export async function conflict(
  req: NextRequest
) {
  try {
    const user = await getCurrentUser(req);

    const body = await req.json();

    const data =
      await createConflict(
        body.documentId,
        user.id,
        body.localContent as Prisma.InputJsonValue,
        body.remoteContent as Prisma.InputJsonValue
      );

    return NextResponse.json(
      {
        success: true,
        conflict: data,
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
            : "Conflict creation failed",
      },
      {
        status: 400,
      }
    );
  }
}

// =====================================
// Get Conflicts
// GET /api/sync/conflict
// =====================================

export async function conflicts(
  req: NextRequest
) {
  try {
    const user = await getCurrentUser(req);

    const documentId =
      req.nextUrl.searchParams.get("documentId");

    if (!documentId) {
      throw new Error("Document ID is required");
    }

    const result =
      await getConflicts(
        documentId,
        user.id
      );

    return NextResponse.json({
      success: true,
      conflicts: result,
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
      {
        status: 400,
      }
    );
  }
}

// =====================================
// Resolve Conflict
// PATCH /api/sync/conflict
// =====================================

export async function resolve(
  req: NextRequest
) {
  try {
    const user = await getCurrentUser(req);

    const body = await req.json();

    const result =
      await resolveConflict(
        body.conflictId,
        user.id
      );

    return NextResponse.json({
      success: true,
      conflict: result,
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
      {
        status: 400,
      }
    );
  }
}