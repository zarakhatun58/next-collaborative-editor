import { NextRequest, NextResponse } from "next/server";
import { Prisma, SyncOperationType } from "@prisma/client";
import {
  createSyncSchema,
  processQueueSchema,
  createConflictSchema,
  resolveConflictSchema,
  queueSchema,
  optionalDocumentSchema,
} from "@/src/validators/sync.validation";
import {
  createSyncOperation,
  getPendingOperations,
  processQueue,
  createConflict,
  getConflicts,
  getAllConflicts,
  resolveConflict,
} from "@/src/services/sync.service";
import { getCurrentUser } from "@/src/services/auth.service";


export async function create(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);

    const body = createSyncSchema.parse(
      await req.json()
    );

    const operation = await createSyncOperation(
      body.documentId,
      user.id,
      body.operationType,
      body.payload,
      body.baseVersion,
      body.clientVersion,
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


export async function queue(
  req: NextRequest
) {
  try {
    const user = await getCurrentUser(req);

    const parsed = queueSchema.parse({
      documentId:
        req.nextUrl.searchParams.get(
          "documentId"
        ),
    });

    const operations =
      await getPendingOperations(
        parsed.documentId,
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

export async function process(
  req: NextRequest
) {
  try {
    const user = await getCurrentUser(req);

    const body = processQueueSchema.parse(
      await req.json()
    );

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

export async function conflict(
  req: NextRequest
) {
  try {
    const user = await getCurrentUser(req);
    const body =
      createConflictSchema.parse(
        await req.json()
      );

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

export async function conflicts(
  req: NextRequest
) {
  try {
    const user = await getCurrentUser(req);

    const parsed =
      optionalDocumentSchema.parse({
        documentId:
          req.nextUrl.searchParams.get(
            "documentId"
          ) ?? undefined,
      });

    const result = parsed.documentId
      ? await getConflicts(
          parsed.documentId,
          user.id
        )
      : await getAllConflicts(
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

export async function resolve(
  req: NextRequest
) {
  try {
    const user = await getCurrentUser(req);

    const body =
      resolveConflictSchema.parse(
        await req.json()
      );

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